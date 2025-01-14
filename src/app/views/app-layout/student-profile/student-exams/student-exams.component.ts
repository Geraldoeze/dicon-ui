import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';


@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrl: './student-exams.component.scss'
})
export class StudentExamsComponent {
  StudentExams:any;
  student_id:any;

  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router){}

  ngOnInit(){
    this.getStudentExams()
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
