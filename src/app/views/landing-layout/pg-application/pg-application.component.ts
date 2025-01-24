import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';

interface UploadedFile {
  name: string;
  file: File;
}

interface Programme {
  id: number;
  program: string;
}

@Component({
  selector: 'app-pg-application',
  templateUrl: './pg-application.component.html',
  styleUrl: './pg-application.component.scss',
  providers: [MessageService]
})
export class PgApplicationComponent implements OnInit {
  applicationForm!: FormGroup;
  imageFile: UploadedFile | null = null;
  documentFile: UploadedFile | null = null;
  formStage = 1;
  currentStage = 1;
  loading = false;
  programmes: Programme[] = [];

  @Output() completed = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder, 
    private api: HttpServiceService, 
    private messageService: MessageService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.getProgrammes();
  }

  private initForm() {
    this.applicationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      program_id: ['', Validators.required]
    });
  }

  getProgrammes() {
    this.api.get('programs/').subscribe({
      next: (res: any) => {
        this.programmes = res as Programme[];
      },
      error: (err: any) => this.showError('Failed to fetch programmes')
    });
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateImageFile(file)) {
        this.imageFile = { name: file.name, file };
      }
    }
  }

  onDocumentSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateDocumentFile(file)) {
        this.documentFile = { name: file.name, file };
      }
    }
  }

  private validateImageFile(file: File): boolean {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedType = 'image/jpeg';

    if (file.size > maxSize || file.type !== allowedType) {
      this.showError('Please upload a JPG image under 2MB');
      return false;
    }
    return true;
  }

  private validateDocumentFile(file: File): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedType = 'application/pdf';

    if (file.size > maxSize || file.type !== allowedType) {
      this.showError('Please upload a PDF document under 5MB');
      return false;
    }
    return true;
  }

  save() {
    if (this.applicationForm.invalid) {
      this.showError('Please fill in all required fields');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    
    Object.keys(this.applicationForm.controls).forEach(key => {
      const control = this.applicationForm.get(key);
      if (control) {
        formData.append(key, control.value);
      }
    });

    if (this.imageFile) {
      formData.append('photo', this.imageFile.file, this.imageFile.name);
    }
    if (this.documentFile) {
      formData.append('application_form', this.documentFile.file, this.documentFile.name);
    }

    console.log(formData);
    

    this.api.post('applications/', formData).subscribe({
      next: (res: any) => {
        this.showSuccess('Application submitted successfully');
        this.resetForm();
      },
      error: (err: any) => {
        this.showError('Failed to submit application');
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private resetForm() {
    this.applicationForm.reset();
    this.imageFile = null;
    this.documentFile = null;
    this.toggleFormStage(1);
  }

  toggleFormStage(stage: number) {
    this.formStage = stage;
    this.currentStage = stage;
  }

  deleteImage(): void {
    this.imageFile = null;
  }

  deleteDocument(): void {
    this.documentFile = null;
  }

  showSuccess(message: string) {
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: message 
    });
  }

  showError(message: string) {
    this.messageService.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: message 
    });
  }

  downloadFile(file: UploadedFile): void {
    const url = URL.createObjectURL(file.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }
}