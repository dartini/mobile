import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './module/core/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private authService: AuthService, private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable(observer => this.authService.user.subscribe((user) => {
      if (!user) {
        this.authService
          .authenticateWithFacebook()
          .subscribe(
            () => observer.next(true),
            () => {
              observer.next(false);

              this.router.navigate(['/']);
            }
          );
      } else {
        observer.next(true);
      }
    }));
  }
}
