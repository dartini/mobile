import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {AuthService} from './auth.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {catchError, map, mergeMap, tap} from 'rxjs/internal/operators';
import {User} from '../model/user.model';

@Injectable()
export class UserService {

  private user: Observable<User>;

  private firstUpdate: boolean = false;

  public constructor(private authService: AuthService, private db: AngularFireDatabase) { }

  public findUserAccount(): Observable<User> {
    if (this.user) {
      return this.user;
    }

    this.user = new Observable(observer => this.authService.user.subscribe((user) => {
        if (!user) {
          this.authService.authenticateWithFacebook()
            .pipe(
              mergeMap((userInformations) => this.makeUser(userInformations))
            )
            .subscribe((u: User) => observer.next(u));
        } else {
          this.makeUser(user).subscribe((u: User) => observer.next(u));
        }
      })
    );

    return this.user;
  }

  public findById(id: string): Observable<User> {
    return this.db
      .object('/users/' + id)
      .snapshotChanges()
      .pipe(
        tap((os: any) => {
          if (!os.key) {
            throw Error('No user found');
          }
        }),
        map((os: any) => {
          const u: User = <User>os.payload.val();
          u.id = os.payload.key;

          return u;
        })
      );
  }

  private makeUser(userInformation: any): Observable<User> {
    return this.findById(userInformation.providerData[0].uid)
      .pipe(
        tap((user: User) => {
          if (this.firstUpdate) {
            return;
          }

          const infos = userInformation.providerData[0];
          user.username = infos.email;
          user.displayName = infos.displayName;
          user.photoURL = infos.photoURL;

          this.db.object('/users/' + userInformation.providerData[0].uid).set(user);
          this.firstUpdate = true;
        }),
        catchError((err: Error) => {
          const user: User = <User>userInformation.providerData[0];
          this.db.object('/users/' + userInformation.providerData[0].uid).set(user);

          user.id = userInformation.providerData[0].uid;

          return this.user;
        })
      );
  }
}
