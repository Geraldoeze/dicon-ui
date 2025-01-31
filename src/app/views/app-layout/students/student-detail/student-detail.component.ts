import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
  addStudent = false;
  confirmDelete = false;
  students:any;


  tableHeader = ['Name', 'Department', 'Status', 'phone_number', 'Enrolement date']

  constructor(private api: HttpServiceService){}

  ngOnInit(){
    this.getStudent()
  }

  getStudent(){
    this.api.get('students/').subscribe(
      res=>{
        this.students=res
        console.log('students', this.students);
      }, err=>{
        console.log(err);
      }
    )
  }

  toggleConfirmDelete(){
    this.confirmDelete =!this.confirmDelete;
  }

  showAddStudentForm(){
    console.log('showAddStudentForm')
    // this method is triggers the add student form even though there is nothing it.
    this.addStudent = !this.addStudent;
  }

}
