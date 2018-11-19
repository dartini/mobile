import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './module/core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {LoginComponent} from './component/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import {TargetsComponent} from './component/targets/targets.component';
import {AuthGuard} from './auth.guard';
import {NgxTsSerializerModule} from 'ngx-ts-serializer';
import { SideMenuComponent } from './component/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    TargetsComponent,
    SideMenuComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    NgxTsSerializerModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
