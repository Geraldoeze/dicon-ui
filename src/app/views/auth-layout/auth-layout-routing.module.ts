import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
//import { SignUpComponent } from './sign-up/sign-up.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      // {path: 'signup', component: SignUpComponent},
      // {path: 'reset-password', component: ResetPasswordComponent},
      // {path: 'forgot-password', component: ForgotPasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
