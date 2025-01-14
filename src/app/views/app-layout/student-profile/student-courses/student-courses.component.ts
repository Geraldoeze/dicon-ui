import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';



@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.scss']

})
export class StudentCoursesComponent {

  StudentCourses:any;
  student_id:any;
  calender: boolean = false;

  

  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router){}

  ngOnInit(){
    
    this.getStudentCourses();
   
  }

  getStudentCourses(){
    let uri:any;
    let userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'student'){
      uri='students/courses'
    } else{
      uri='students/courses?student_id=' + this.getParamsId()
    }

    this.api.get(uri).subscribe(
      res=>{
        this.StudentCourses = res;
        console.log('student courses', this.StudentCourses)

      }, err=>{
        console.log(err)
      }
    )
  }

  
  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.student_id = segments[segments.length - 1];

    return this.student_id;
  }

  route(page:string){
    this.router.navigate([page]);
  }

  toggleCalender(){
    this.calender = !this.calender;
  }

}
