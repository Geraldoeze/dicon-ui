import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrl: './register-course.component.scss'
})
export class RegisterCourseComponent {
  calender:boolean = false;
  @Input() requiredCourses:any;
  @Input() electiveCourses:any;
  @Input() carryOverCourses:any;

  constructor(private router:Router){}
  route(page:string){
    this.router.navigate([page]);
  }

  toggleCalender(){
    this.calender = !this.calender;
  }
}
