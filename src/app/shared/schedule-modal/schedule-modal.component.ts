import { Component, Input } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';


enum UploadState {
  INITIAL,
  SUCCESS,
  ERROR
}

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrl: './schedule-modal.component.scss'
})
export class ScheduleModalComponent {
  class:any;
  isDragging = false; // State for drag-and-drop
  file: File | null = null; // Selected file
  assignmentForm:any;
  scheduleForm:any;
  staff_id:any;
  loading:boolean = false;
  result: any;
  @Input() viewer!:string;
  @Input() course!:any;

  constructor(private api:HttpServiceService, private fb:FormBuilder, private storage: StorageService){}

  ngOnInit(){
    this.scheduleForm = this.fb.group({
      class_link: ['', Validators.required],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
    })
  }


  save() {
    console.log(this.scheduleForm.value)
    let uri:any;
    let userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'staff'){
      uri='classes'
    } else{
      uri='classes/staff_id=' + this.getParamsId()
    }


    this.api.post(uri, this.scheduleForm.value).subscribe(
      (response) => {
        this.result = response;
        console.log('Submitted successfully:', this.result);
        this.loading = true;

      },
      (error) => {
        console.error('Error submitting assignment:', error);
      }
    );
  }

   
  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.staff_id = segments[segments.length - 1];

    return this.staff_id;
  }

  UploadState = UploadState; // Make enum available to template
  currentState = UploadState.INITIAL;
  dragOver = false;
  errorMessage = '';


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  private handleFiles(files: FileList): void {
    const file = files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Please upload an SVG, PNG, JPG, or GIF file.';
      this.currentState = UploadState.ERROR;
      return;
    }
    // Check file size (800x400px max approximated to ~1MB)
    if (file.size > 1024 * 1024) {
      this.errorMessage = 'File size exceeds maximum limit.';
      this.currentState = UploadState.ERROR;
      return;
    }

    // Simulate file upload with random success/failure
    this.uploadFile(file);
  }

  private uploadFile(file: File): void {
    // Simulate API call
    setTimeout(() => {
      // Randomly succeed or fail for demonstration
      if (Math.random() > 0.5) {
        this.currentState = UploadState.SUCCESS;
      } else {
        this.errorMessage = 'Upload failed. Please try again.';
        this.currentState = UploadState.ERROR;
      }
    }, 1500);
  }

  tryAgain(): void {
    this.currentState = UploadState.INITIAL;
    this.errorMessage = '';
  }

  uploadAnother(): void {
    this.currentState = UploadState.INITIAL;
  }

}
