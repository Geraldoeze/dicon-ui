import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [MessageService]  // Add the MessageService to the component's providers array to enable it.  This is needed for PrimeNG's message service.  It's a dependency injection service.  It provides an interface for displaying messages to the user.  The 'MessageService' class is provided by PrimeNG.  The 'providers' array is used to provide the MessageService class as a dependency for this component.  Without this, the MessageService would not be available to this
})
export class ForgotPasswordComponent {
  forgotPasswordForm:any;
  isSubmitted = false;
  loading = false;

  constructor(private fb:FormBuilder, private messageService: MessageService, private router: Router){
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  get f(){return this.forgotPasswordForm.controls}

  submit(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.forgotPasswordForm.invalid){
      this.loading = false;
      return;
    }

    this.router.navigateByUrl('auth/reset-password')
  }



  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
