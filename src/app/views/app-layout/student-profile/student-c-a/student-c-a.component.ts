import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service'; 
import { StorageService } from '../../../../services/storage.service';



@Component({
  selector: 'app-student-c-a',
  templateUrl: './student-c-a.component.html',
  styleUrl: './student-c-a.component.scss'
})
export class StudentCAComponent implements OnInit {
  student_id:any;
  StudentAssignment:any;
  classes:any = [];

  // classes = [
  //   {
  //   code : 'ELE 321',
  //   name : 'Electrical Engineering',
  //   time : 12,
  //   lecturer: 'Prof Aiyede'
  //   },
  //   {
  //     code : 'CSC 321',
  //     name : 'Computer Science',
  //     time : 1,
  //     lecturer: 'Prof Aiyede'
  //   },
  //   {
  //     code : 'MAT 321',
  //     name : 'Mathematics',
  //     time : 4,
  //     lecturer: 'Prof Aiyede'
  //   },
  // ]



  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router) {}

  ngOnInit(){
    this.getStudentAssignment();
    this. getStudentClasses();
  }

  getStudentAssignment(){
    let uri:any;
    const userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'student'){
      uri='students/assignments'
    } else{
      uri='students/assignments?student_id=' + this.getParamsId()
    }

    this.api.get(uri).subscribe(
      res=>{
        this.StudentAssignment = res;
        console.log('Student assignment data', this.StudentAssignment)

      }, err=>{
        console.log(err)
      }
    )
  }
  
  getStudentClasses(){
    let uri:any;
    const userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'student'){
      uri='classes/1?period='
    }

    this.api.get(uri).subscribe(
      (res: any)=>{
        this.classes = res.data;
        console.log('', this.classes);

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

}
