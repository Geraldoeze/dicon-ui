import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { FormBuilder, Validators } from '@angular/forms';


enum UploadState {
  INITIAL,
  SUCCESS,
  ERROR
}

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.scss'
})
export class AssignmentDetailComponent {
@Input() viewer!:string;
@Input() assignmentDetail:any = {};
isDragging = false; // State for drag-and-drop
  file: File | null = null; // Selected file
  assignmentForm:any;
  loading:boolean = false;
  result: any;

  constructor(private api:HttpServiceService, private fb:FormBuilder){}


  // assignment-detail.component.ts
    ngOnInit(){
      console.log('assignmentDetail:', this.assignmentDetail);

        this.assignmentForm = this.fb.group({
          submission_url: ['', Validators.required],
          assignment_id: ['', Validators.required]
        })


      }
  students = [
    {
      name: "Bright Musa",
      department: "Inland Security",
      matric_number: "123456",
      submissions: ""
    }
  ]

  tableHeader = ['Name', 'Department', 'Matric Number', 'Submisssions']



  save () {
    this.assignmentForm.patchValue({assignment_id: this.assignmentDetail.assignment_id})
    console.log('assignment id', this.assignmentForm.get('assignment_id').value);
    console.log(this.assignmentForm.value)
    this.api.post(`students/assignments/submit`, this.assignmentForm.value).subscribe(
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



  //Handle drag over
  // onDragOver(event: DragEvent): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.isDragging = true;
  // }

  // Handle drag leave
  // onDragLeave(event: DragEvent): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.isDragging = false;
  // }

  // Handle file drop
  // onDrop(event: DragEvent): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.isDragging = false;

  //   if (event.dataTransfer && event.dataTransfer.files.length > 0) {
  //     this.file = event.dataTransfer.files[0];
  //   }
  // }

  // Handle file selection
  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.file = input.files[0];
  //   }
  // }


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
