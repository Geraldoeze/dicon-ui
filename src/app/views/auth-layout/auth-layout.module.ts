import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../primeng/primeng.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    NgxSpinnerModule
  ]
})
export class AuthLayoutModule { }
