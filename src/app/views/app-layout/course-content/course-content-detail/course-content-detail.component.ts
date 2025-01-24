import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-course-content-detail',
  templateUrl: './course-content-detail.component.html',
  styleUrl: './course-content-detail.component.scss'
})
export class CourseContentDetailComponent {
  videos:any;
  open = false
  currentId=0
  courseId:any;
  assignments:any
  view:any = ''
  viewer:any;
  course:any;
  visibleModal: boolean = false;

  constructor(private location: Location, private router:Router, private api:HttpServiceService){}




  ngOnInit(){
    this.view = 'videos';
    this.getVideos(this.getParamsId());
    this.getAssignments(this.getParamsId());
    this.getCourse();
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.courseId = segments[segments.length - 1];

    return this.courseId;
  }

  getVideos(courseId:any){
    this.getParamsId()
    this.api.get('courses/' + courseId + '/videos' ).subscribe(
      (res:any)=>{
        this.videos = res
        console.log('videos', this.videos)
      }, err=>{
        console.log(err);
      }
    )
  }

  getAssignments(courseId:any){
    this.getParamsId()
    this.api.get('assignments/?course_id=' + courseId).subscribe(
      res=>{
        this.assignments = res
        console.log('assignments', this.assignments)
      }, err=>{
        console.log(err);
      }
    )
  }

  getCourse(){
    this.api.get('courses/1').subscribe(
      (res: any)=>{
        this.course = res
        console.log('course', this.course)
      }, err=>{
        console.log(err);
      }
    )
  }

 


  showUploadModal() {
      this.visibleModal = true;
  }

  toggleView(view:string){
    this.view = view
  }
  openVideo(videoUrl:string) {
    window.open(videoUrl, '_blank');
  }

  openChapter(id:number){
    this.open = !this.open;
    this.currentId = id;
  }

  goBack(): void {
    this.location.back();
  }


}
