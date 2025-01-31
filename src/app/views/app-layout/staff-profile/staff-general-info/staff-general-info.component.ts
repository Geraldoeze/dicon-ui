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
  isSubmitted = false;
  loading = false;


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

    this.api.post('staffs/change-password', this.changePasswordForm.value).subscribe(
      (res) => {
       
        console.log('Password changed successfully');
        this.showSuccess('Password changed successfully')
        this.changePasswordForm.reset();
      },
      (err) => {
       
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
