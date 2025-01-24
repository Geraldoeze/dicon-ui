import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-staff-c-a',
  templateUrl: './staff-c-a.component.html',
  styleUrl: './staff-c-a.component.scss'
})
export class StaffCAComponent {


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
  classes:any;
  assignments:any;
  staff_id:any;

  
  constructor(private router:Router, private api:HttpServiceService) {}
  ngOnInit(){
    
    this.getStudentAssignment();
    this.getStudentClasses();
  }

  getStudentAssignment(){
    this.api.get('students/assignments?student_id=' + 1).subscribe(
      res=>{
        this.assignments = res;
        console.log('Student Exams data', this.assignments)

      }, err=>{
        console.log(err)
      }
    )
  }

  getStudentClasses(){
    this.api.get('classes/1?page=1&page_size=10&period=').subscribe(
      (res:any)=>{
        this.classes = res.data;
        console.log('Student Classes data', this.classes)

      }, err=>{
        console.log(err)
      }
    )
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.staff_id = segments[segments.length - 1];

    return this.staff_id;
  }

  route(page:string){
    this.router.navigate([page]);
  }

}
