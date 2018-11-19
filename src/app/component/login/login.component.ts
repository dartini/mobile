import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../module/core/service/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private fbSubscription: Subscription;

  public errorInLogin: boolean = false;

  public constructor(private authService: AuthService, private router: Router) {
  }

  public ngOnInit(): void {
    this.authService.authenticateWithFacebook().subscribe(
      () => this.router.navigate(['app', 'targets']),
      () => this.errorInLogin = true
    );
  }

  public ngOnDestroy(): void {
    if (this.fbSubscription) {
      this.fbSubscription.unsubscribe();
    }
  }
}
