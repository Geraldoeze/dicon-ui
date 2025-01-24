import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
  providers: [MessageService]
})
export class GeneralInfoComponent {
  @Output() viewExams = new EventEmitter();
  @Input() name!:string;
  @Input() profileData:any;
  changePasswordForm: any;
  isSubmitted:boolean = false;
  loading:boolean = false;
  old_password: string = '';
  new_password: string = '';
  confirm_password: string = '';
  profileForm: any;

  constructor(private api:HttpServiceService, private storage: StorageService, private fb:FormBuilder, private messageService: MessageService,){
    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  get f(){return this.changePasswordForm.controls}

  ngOnInit(){
    // this.getProfile();
  }
  onClick(){
    this.viewExams.emit('click');
    // console.log('child hit')
  }
  submitForm() {
    if (this.new_password !== this.confirm_password) {
      throw Error ('Passwords do not match');
    }

    this.isSubmitted = true;
    this.loading = true;

    if(this.changePasswordForm.invalid){
      this.loading = false;
      return;
    }

    // Call the API endpoint to change the password
    this.api.post('students/change-password', this.changePasswordForm.value).subscribe(
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
  // getProfile(){
  //   let uri:any;
  //   let userAccountType = this.storage.getdata('userAccountType')
  //   if(userAccountType?.toLowerCase() === 'student'){
  //     uri='students/courses'
  //   } else{
  //     uri='students/courses?student_id=' + this.studentId
  //   }
  //   this.api.get('students/profile').subscribe(
  //     res=>{
  //       this.profileData = res;
  //       console.log('profile data', this.profileData)

  //     }, err=>{
  //       console.log(err)
  //     }
  //   )
  // }

