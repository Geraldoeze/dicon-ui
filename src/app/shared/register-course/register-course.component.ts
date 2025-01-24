import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';
import { StorageService } from '../../services/storage.service'; 
import { CourseContentComponent } from '../../views/app-layout/course-content/course-content.component';
@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrl: './register-course.component.scss'
})
export class RegisterCourseComponent {
  calender:boolean = false;
  registered:any;
  @Input() requiredCourses:any;
  @Input() electiveCourses:any;
  @Input() carryOverCourses:any;
  @Input() fetchCoursesBySession!: (programId: number, session: string) => void;

  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router){}
  route(page:string){
    this.router.navigate([page]);
  }


  
  // getStudentExamsResult(studentId:any){

  //   this.api.get(`students/exams/results?exam_id=${this.examsId}&student_id=${studentId}`).subscribe(
  //     res=>{
  //       this.examDetail = res;
  //       console.log('exams detail', this.examDetail)

  //     }, err=>{
  //       console.log(err)
  //     }
  //   )
  // }
registerCourse(courseId: string): void {
 
  this.api.post(`students/courses/register?course_id=${courseId}`, { courseId }).subscribe(
    (response) => {
      this.registered = response;
      console.log('Course registered successfully:', response);
      this.changeButtonText();
    },
    (error) => {
      console.error('Error registering course:', error);
    }

    
  );
}

  changeButtonText(){
    const button = document.querySelector('#register') as HTMLElement;
    if(button){
      if(this.registered){
        button.innerText = 'Registered';
        button.classList.add('bg-gray-500', 'text-white');
      } else {
        button.innerText = 'Register';
        button.classList.remove('bg-gray-500', 'text-white');
        button.classList.add('bg-white', 'text-black');
      }
    }
  }







  toggleCalender(){
    this.calender = !this.calender;
  }
}
