import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exams-detail',
  templateUrl: './exams-detail.component.html',
  styleUrl: './exams-detail.component.scss'
})
export class ExamsDetailComponent {
  @Input() examDetail:any;

  students = [
    {
      name: "Bright Musa",
      department: "Inland Security",
      matric_number: "123456",
      submissions: ""
    }
  ]

  tableHeader = ['Name', 'Department', 'Matric Number', 'Score', 'Status']

  goBack() {
    window.history.back();
  }


}
