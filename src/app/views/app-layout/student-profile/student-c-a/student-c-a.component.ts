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

  classes = [
    {
    code : 'ELE 321',
    name : 'Electrical Engineering',
    time : 12,
    lecturer: 'Prof Aiyede'
    },
    {
      code : 'CSC 321',
      name : 'Computer Science',
      time : 1,
      lecturer: 'Prof Aiyede'
    },
    {
      code : 'MAT 321',
      name : 'Mathematics',
      time : 4,
      lecturer: 'Prof Aiyede'
    },
  ]

  assignments = [
    {
      assignment_id: 1,
      class: 'ELE 321',
      title: 'Assignment 1',
      due_date: '2021-09-30',
      due_time: '4:00',
      
    },
    {
      assignment_id: 2,
      class: 'CSC 321',
      title: 'Assignment 2',
      due_date: '2021-09-30',
      due_time: '12:00',
      
    },
    {
      assignment_id: 3,
      class: 'MAT 321',
      title: 'Assignment 3',
      due_date: '2021-09-30',
      due_time: 'Turned in',
      
    }
  ]


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
        console.log('Student assignment data', this.StudentAssignment)

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
