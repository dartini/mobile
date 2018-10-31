import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {share} from 'rxjs/internal/operators';

@Injectable()
export class AuthService {

  public user: Observable<firebase.User>;

  public constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState.pipe(share());
  }

  public authenticateWithFacebook(): Observable<any> {
    return fromPromise(this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()));
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
