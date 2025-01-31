import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.scss'
})
export class AssignmentComponent implements OnInit {
  viewStaffAssignment = false;
  viewStudentAssignment = false;
  assignmentDetail = []
  @Input() viewer!:string;
  @Input() assignments:any;
  @Input() classes: any;


  constructor(private storage: StorageService, private router: Router){}

  ngOnInit(){
    const data = this.storage.getJson('user')

    console.log('passed assignment', this.assignments)
  }


  getAssignmentById(id: any) {
    console.log('id', id)
    return this.assignments.find((assignment:any) => assignment.assignment_id === id) || null;
  }

  visibleClass = false;
  visibleAssignment = false;

  showClassModal() {
      this.visibleClass = true;
  }

  showAssignmentModal() {
    this.visibleAssignment = true;
}

  toggleViewAssignmentDetail(viewer:string, id:any) {
    console.log('viewer', viewer, 'id', id, 'assignments', this.assignments)
    if(viewer=='staff'){
      this.viewStaffAssignment =!this.viewStaffAssignment;
      this.assignmentDetail = this.getAssignmentById(id)
      console.log(this.assignmentDetail)
    }else if(viewer=='student'){
      this.viewStudentAssignment = !this.viewStudentAssignment;
      this.assignmentDetail = this.getAssignmentById(id)
      console.log('students assignment detail', this.assignmentDetail)
      console.log(this.assignmentDetail)

    }
  }

  route(page:string){
    this.router.navigate([page]);
}
}
