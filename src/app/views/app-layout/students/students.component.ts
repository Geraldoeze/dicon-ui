import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  data: any;
  options: any=null;
  confirmDelete = false;
  viewDropOut = false;
  dropoutData:any=[];
  ActiveStudents = false;
  activeStudentsData:any=[];
  students:any=[];
  studentsMetrics:any=[];
  addStudent = false;


  constructor(private api: HttpServiceService){}


  tableHeader = ['Name', 'Department', 'phone_number', 'Enrolement date']

  ngOnInit() {
    this.getStudentMetrics();
    this.getRecentStudent();
    this.getActiveStudent();
    this.getDropout()
  }

  getStudentMetrics(){
    this.api.get('dashboard/student').subscribe(
      (res: any)=>{
        this.studentsMetrics=res.data
        console.log(this.students);
      }, err=>{
        console.log(err);
      }
    )
  }

  getRecentStudent(){
    this.api.get('students/').subscribe(
      (res:any)=>{
        this.students=res.data
        console.log('students', this.students);
      }, err=>{
        console.log(err);
      }
    )
  }

  getActiveStudent(){
    this.api.get('students/?page=1&page_size=10&status=Active').subscribe(
      (res:any)=>{
        this.activeStudentsData=res.data
        console.log('students', this.students);
      }, err=>{
        console.log(err);
      }
    )
  }


  getDropout(){
    this.api.get('students/?page=1&page_size=10&status=Dropout').subscribe(
      (res:any)=>{
        this.dropoutData=res.data
        console.log('students', this.students);
      }, err=>{
        console.log(err);
      }
    )
  }


  viewDropOuts(){
    this.viewDropOut =!this.viewDropOut;
  }

  toggleConfirmDelete(){
    this.confirmDelete =!this.confirmDelete;
  }

  viewActiveStudents(){
    this.ActiveStudents =!this.ActiveStudents;
  }

  showAddStudentForm(){
    console.log('showAddStudentForm')
    // this method is triggers the add student form even though there is nothing it.
    this.addStudent = !this.addStudent;
  }

}
