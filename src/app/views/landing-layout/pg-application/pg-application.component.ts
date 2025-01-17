import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';

interface UploadedFile {
  name: string;
  file: File;
}

@Component({
  selector: 'app-pg-application',
  templateUrl: './pg-application.component.html',
  styleUrl: './pg-application.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class PgApplicationComponent {

  imageFile: UploadedFile | null = null;
  documentFile: UploadedFile | null = null;
  formStage:any;
  currentStage:any;
  applicationForm:any;
  loading:boolean = false;
  programes:any;
  photo: any;
  applyForm: any;
  imageUploaded = false;
  documentUploaded = false;

  @Output() completed = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private api: HttpServiceService, private messageService: MessageService, private http: HttpClient){}

  ngOnInit(){
    this.formStage =1;
    this.currentStage = 1;
    console.log(this.formStage)
    this.getProgrames()

    this.applicationForm = this.fb.group({
      // Basic information
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      // gender: ['', Validators.required],
      programe_id: ['', Validators.required],
    });


  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photo = input.files[0];
    }
  }

  onApplyFormSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.applyForm = input.files[0];
    }
  }

  get f(){return this.applicationForm.controls}

  save(){
    this.loading = true;

    if(this.applicationForm.invalid){
      console.log('Form is invalid')
      this.showError('One or more fields are required')
      return;
    }

    console.log(this.applicationForm.value)

    let formData = new FormData();

    formData.append('first_name', this.applicationForm.get('first_name').value);
    formData.append('last_name', this.applicationForm.get('last_name').value);
    formData.append('email', this.applicationForm.get('email').value);
    formData.append('phone', this.applicationForm.get('phone').value);
    formData.append('dob', this.applicationForm.get('dob').value);
    // formData.append('gender', this.applicationForm.get('gender').value);
    formData.append('phone', this.applicationForm.get('phone').value);
    formData.append('programe_id', this.applicationForm.get('programe_id').value);
    formData.append('photo', this.photo);
    formData.append('application_form', this.applyForm);



    this.api.post('applications/', formData).subscribe(
      res=>{
        console.log(res);
        this.applicationForm.reset();
        this.photo = null;
        this.applyForm = null;
        this.loading = false;
        this.toggleFormStage(1); // Reset form and go to basic info stage
      }
    )
  }

  getProgrames(){
    this.api.get('programs/').subscribe(
      res=>{
        this.programes = res
        console.log('programes', this.programes)
      },
      err=>{
        console.log(err)
      }
    )
  }

  toggleFormStage(stage:number){
    if(stage){
      this.formStage = stage;
      this.currentStage = stage;
    } else {
      this.formStage = 1;
    }
  }


  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


    

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.size <= 2 * 1024 * 1024 && file.type === 'image/jpeg') { // 2MB limit
        this.imageFile = { name: file.name, file };
      } else {
        alert('Please upload a JPG image under 2MB');
      }
    }
  }
  // onImageSelect(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('image', file);
      
  //     this.http.post('', formData).subscribe(() => {
  //       this.imageUploaded = true;
  //     });
  //   }
  // }

  onDocumentSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.size <= 5 * 1024 * 1024 && file.type === 'application/pdf') { // 5MB limit
        this.documentFile = { name: file.name, file };
      } else {
        alert('Please upload a PDF document under 5MB');
      }
    }
  }

  downloadFile(file: UploadedFile): void {
    const url = URL.createObjectURL(file.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  deleteImage(): void {
    this.imageFile = null;
  }

  deleteDocument(): void {
    this.documentFile = null;
  }

  // onFinish(): void {
  //   if (!this.imageFile || !this.documentFile) {
  //     return;
  //   }

  // onDocumentSelect(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('document', file);
      
  //     this.http.post('', formData).subscribe(() => {
  //       this.documentUploaded = true;
  //     });
  //   }
  // }

  onFinish() {
    if (this.imageUploaded && this.documentUploaded) {
      this.completed.emit();
    }

    
  }




 


}
