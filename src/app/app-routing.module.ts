import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './component/login/login.component';
import {AuthGuard} from './auth.guard';
import {TargetsComponent} from './component/targets/targets.component';
import {LayoutComponent} from './component/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'targets',
        pathMatch: 'full'
      },
      {
        path: 'targets',
        component: TargetsComponent,
        data: {
          title: 'Vos cibles'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
