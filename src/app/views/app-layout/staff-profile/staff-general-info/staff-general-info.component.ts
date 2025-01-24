import { Component , Input} from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-general-info',
  templateUrl: './staff-general-info.component.html',
  styleUrl: './staff-general-info.component.scss',
  providers: [MessageService]
})
export class StaffGeneralInfoComponent {
  @Input() profileData:any;
  changePasswordForm: any;
  isSubmitted:boolean = false;
  loading:boolean = false;


  constructor(private api:HttpServiceService, private storage: StorageService, private fb:FormBuilder, private messageService: MessageService,){
    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],

      
    });
  }

  get f(){return this.changePasswordForm.controls}

  submitForm() {

    this.isSubmitted = true;
    this.loading = true;

    if(this.changePasswordForm.invalid){
      this.loading = false;
      return;
    }

    // Call the API endpoint to change the password
    this.api.post('staffs/change-password', this.changePasswordForm.value).subscribe(
      (res) => {
        // Handle the success response
        console.log('Password changed successfully');
        this.showSuccess('Password changed successfully')
        this.changePasswordForm.reset();
      },
      (err) => {
        // Handle the error response
        console.log('Error changing password:', err);
        this.showError('Password change failed.')
      }
    );
  }

  showSuccess(message:string) {
    console.log(message);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
