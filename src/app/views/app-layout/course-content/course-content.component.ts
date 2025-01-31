import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class CourseContentComponent implements OnInit {

  programes:any = []
  courses:any
  assignments:any;
  confirmDelete = false;
  addVideo = false
  files: any;
  imageSrc: any;
  isSubmitted: any;
  uploadForm:any;
  assignmentForm:any;
  loading = false;
  programeId:any;
  createAssignment = false;


  constructor(private fb: FormBuilder,
            private api: HttpServiceService,
            private messageService:MessageService,
            private router: Router) {}

  ngOnInit(){


    this.uploadForm = this.fb.group({
      // Basic information
      course_id: ['', Validators.required],
      video_url: ['', Validators.required],

    });


    this.assignmentForm = this.fb.group({
      course_id: ['', Validators.required],
      assignment_url: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      pass_mark: ['', Validators.required]
    })

    this.getCourses(this.getParamsId())
    this.getAssignments(this.getParamsId())
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.programeId = segments[segments.length - 1];

    return this.programeId;
  }

  route(page:string){
    this.router.navigate([page]);
  }


  getCourses(programId:any){
    this.getParamsId()
    this.api.get('courses/?program_id=' + programId).subscribe(
      res=>{
        this.courses = res
        console.log(this.courses)
      }, err=>{
        console.log(err);
      }
    )
  }


  getAssignments(programId:any){
    this.getParamsId()
    this.api.get('assignments/?course_id=' + programId).subscribe(
      res=>{
        this.assignments = res
        console.log(this.courses)
      }, err=>{
        console.log(err);
      }
    )
  }

  onFileSelected(event: any): void {
    console.log('selection function hit');

    // Store all selected files
    this.files = Array.from(event.target.files);  // Converts FileList to an array of files

    console.log(this.files);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }



  toggleConfirmDelete(){
    this.confirmDelete =!this.confirmDelete;
  }

  toggleAddVideo(){
    this.addVideo = !this.addVideo;

  }

  toggleCreateAssignment(){
    this.createAssignment = !this.createAssignment;

  }

  get f() {
    return this.uploadForm.controls;
  }
  save() {
    this.loading = true
    if(this.uploadForm.invalid){
      this.showError('one or more fields are required')
      this.loading = false;
      return;
    }

    console.log('upload for data', this.uploadForm.value);

    this.api.post('courses/videos', this.uploadForm.value).subscribe(
      res=>{
        console.log(res);
        this.showSuccess('Video uploaded successfully')
        this.uploadForm.reset();
        this.loading = false;
      }, err=>{
        console.log(err);
        this.loading = false;
      }
    )
      this.toggleAddVideo()
    }


    saveAssignment() {
      this.loading = true
      if(this.assignmentForm.invalid){
        this.showError('one or more fields are required')
        this.loading = false;
        return;
      }

      console.log('upload for data', this.assignmentForm.value);

      this.api.post('assignments/', this.assignmentForm.value).subscribe(
        res=>{
          console.log(res);
          this.showSuccess('Assignment uploaded successfully')
          this.uploadForm.reset();
          this.loading = false;
        }, err=>{
          console.log(err);
          this.loading = false;
        }
      )
        this.toggleCreateAssignment()

      }


    deleteCourse(){
      this.api.delete('').subscribe(
        res=>{
          console.log(res);
        }, err=>{
          console.log(err);
        }
      )
    }

    showSuccess(message: string) {
      console.log('showSuccess')
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    showError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

}
