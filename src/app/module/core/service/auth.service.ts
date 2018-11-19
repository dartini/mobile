import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class AuthService {

  public user: Observable<firebase.User> = null;

  public constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState.pipe(share());
  }

  public authenticateWithFacebook(): Observable<any> {
    return fromPromise(this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()));
  }

  public isLogged(): Observable<boolean> {
    return this.user.pipe(
      map((user: firebase.User) => !!user)
    );
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
