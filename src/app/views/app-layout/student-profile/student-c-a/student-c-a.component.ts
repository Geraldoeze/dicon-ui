import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service'; 
import { StorageService } from '../../../../services/storage.service';



@Component({
  selector: 'app-student-c-a',
  templateUrl: './student-c-a.component.html',
  styleUrl: './student-c-a.component.scss'
})
export class StudentCAComponent {
  student_id:any;
  StudentAssignment:any;


  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router) {}

  ngOnInit(){
  
    this.getStudentAssignment()
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




  route(page:string){
    this.router.navigate([page]);
  }

}
