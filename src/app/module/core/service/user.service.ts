import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, Action, DocumentSnapshot} from 'angularfire2/firestore';
import {User} from '../model/user.model';
import {AuthService} from './auth.service';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import * as firebase from 'firebase';
import {iif, Observable, of} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class UserService {

  private users: AngularFirestoreCollection<User>;

  public constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private deserializer: NgxTsDeserializerService,
    private serializer: NgxTsSerializerService) {
    this.users = this.db.collection<User>('users');
  }

  public findUserAccount(): Observable<User> {
    return this.authService.user.pipe(
      mergeMap((fbUser: firebase.User) => this.findById(fbUser.uid).pipe(
        mergeMap((user: User) => iif(
          () => !!user,
          of(user),
          of(this.deserializer.deserialize(User, fbUser)).pipe(
            tap((newUser: User) => newUser.targetsNames = []),
            mergeMap((newUser: User) => this.create(newUser).pipe(
              map(() => newUser)
            )))
          )
        )
      ))
    );
  }

  public findById(id: string): Observable<User> {
    return this.users.doc<User>(id).snapshotChanges().pipe(
      map((snapshot: Action<DocumentSnapshot<User>>) => {
        if (!snapshot.payload.data()) {
          return null;
        }

        const user: User = this.deserializer.deserialize(User, snapshot.payload.data());
        user.id = snapshot.payload.id;

        return user;
      })
    );
  }

  public create(user: User): Observable<any> {
    return fromPromise(this.users.doc(user.id).set(this.serializer.serialize(user)));
  }
}
