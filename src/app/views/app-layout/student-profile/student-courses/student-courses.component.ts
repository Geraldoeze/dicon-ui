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
  studentcourses:any;

  coursescategory:any;
  coursesCategory:any;

  requiredcourses:any[] = [];
  electivecourses:any[] = [];

  coursesSession:any;
  student_id:any;
  calender: boolean = false;
  currentMenu: any = 'registerCourses';
  

  

  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router){}

  ngOnInit(){
    // this.getStudentCoursesByCategory();
    this.fetchCoursesBySession(1, '2024/2025');
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

  // getStudentCoursesByCategory(){
  //   let uri:any;
  //   let userAccountType = this.storage.getdata('userAccountType')
  //   if(userAccountType?.toLowerCase() === 'student'){
  //     uri='courses/?program_id=1&category='
  //   }

  //   this.api.get(uri).subscribe(
  //     (res)=>{
  //       this.coursescategory = res;
  //       console.log('student courses', this.coursescategory);
  //       this.coursesCategory = this.coursescategory.data;
  //       this.filterRequiredCourses();
  //       this.filterElectiveCourses();

  //     }, err=>{
  //       console.log(err)
  //     }
  //   )
  // }

  fetchCoursesBySession(programId: number, session: string) {
    const url = `courses/?program_id=${programId}&session=${session}&category=`;
    this.api.get(url).subscribe(
      (res: any) => {
        this.coursesSession = res.data;
        this.filterRequiredCourses();
        this.filterElectiveCourses();
      },
      err => {
        console.log(err);
      }
    );
  }


filterRequiredCourses() {
  if (this.coursesSession) {
    this.requiredcourses = this.coursesSession.filter((course: { category: string; }) => course.category === "Required");
    console.log('required courses', this.requiredcourses);
    
  }
}


filterElectiveCourses() {
  if (this.coursesSession) {
    this.electivecourses = this.coursesSession.filter((course: { category: string; }) => course.category === "Elective");
    console.log('elective courses', this.electivecourses);
    
  }
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
