import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [MessageService]
})
export class ResetPasswordComponent {

  resetPasswordForm:any;
  isSubmitted = false;
  loading = false;

  constructor(private fb:FormBuilder, private messageService: MessageService, private router: Router){
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }


  get f(){return this.resetPasswordForm.controls}

  submit(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.resetPasswordForm.invalid){
      this.loading = false;
      return;
    }



    this.router.navigateByUrl('app/reset-password')
  }



  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
