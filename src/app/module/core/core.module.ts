import {TargetService} from './service/target.service';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';

@NgModule({
  providers: [
    AuthService,
    UserService,
    TargetService
  ]
})
export class CoreModule {

  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
