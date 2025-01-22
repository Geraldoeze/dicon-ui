import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent {
  items: MenuItem[] | undefined;
  currentMenu:any = 'general';
  student_id:any;
  profileData:any;
  StudentCourses:any;
  StudentExams:any;
  StudentAssignment:any;
  uri:any;


  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router){}

  ngOnInit(){
    this.getProfile();
    // this.getStudentCourses();
    // this.getStudentExams()
    // this.getStudentAssignment()
  }

  getProfile(){
    let uri:any;
    let userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'student'){
     uri='students/profile?student_id=' + this.getParamsId()
    } 
    else{
      //uri='students/profile?student_id=' + this.getParamsId()
    }

    this.api.get(uri).subscribe(
      res=>{
        this.profileData = res;
        console.log('profile data', this.profileData)

      }, err=>{
        console.log(err)
      }
    )
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

  getStudentExams(){
    let uri:any;
    let userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'student'){
      uri='students/exams'
    } else{
      uri='students/exams?student_id=' + this.getParamsId()
    }


    this.api.get(uri).subscribe(
      res=>{
        this.StudentExams = res;
        console.log('exams data', this.StudentExams)

      }, err=>{
        console.log(err)
      }
    )
  }

  getStudentAssignment(){
    let uri:any;
    let userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'student'){
      uri='students/assignments'
    } else{
      uri='students/assignments?student_id=' + this.getParamsId()
    }

    this.api.get(uri).subscribe(
      res=>{
        this.StudentAssignment = res;
        console.log('Student Exams data', this.StudentAssignment)

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

  toggleTab(menu:string){
    this.currentMenu = menu;
    console.log(this.currentMenu)
  }


  route(page:string){
    this.router.navigate([page]);
  }

}
