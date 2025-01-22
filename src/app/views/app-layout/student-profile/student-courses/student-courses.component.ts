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

  
  requiredCourses = [{
    id: 1,
    code: 'CS101',
    title: 'Introduction to Computer Science',
    unit: '3'
  },
  {
    id: 2,
    code: 'CS102',
    title: 'Introduction to Computer Science',
    unit: '3'
  },
  { 
    id: 3,
    code: 'CS103',
    title: 'Introduction to Computer Science',
    unit: '3'
  },
  { 
    id: 4,
    code: 'CS104',
    title: 'Introduction to Computer Science',
    unit: '3'
  },
  {
    id: 5,
    code: 'CS105',
    title: 'Introduction to Computer Science',
    unit: '3'
  },
]

electiveCourses = [
  
    {
      id: 6,
      code: 'CS105',
      title: 'Introduction to Computer Science',
      unit: '3'
    },  {
      id: 7,
      code: 'CS105',
      title: 'Introduction to Computer Science',
      unit: '3'
    }, {
      id: 8,
      code: 'CS105',
      title: 'Introduction to Computer Science',
      unit: '3'
    }, {
      id: 9,
      code: 'CS105',
      title: 'Introduction to Computer Science',
      unit: '3'
    },
  
]

  StudentCourses:any;
  student_id:any;
  calender: boolean = false;
  currentMenu: any = 'registerCourses';
  studentcourses:any;

  

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
      (res)=>{
        this.StudentCourses = res;
        console.log('student courses', this.StudentCourses);
        this.studentcourses = this.StudentCourses.data;

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

  toggleTab(menu:string){
    this.currentMenu = menu;
  }

}
