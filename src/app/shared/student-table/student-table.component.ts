import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss'
})
export class StudentTableComponent implements OnInit {
  @Input() showHeader = false;
  @Input() tableTitle!: string;
  @Input() students: any[] = [];
  @Input() studentCourses: any[] = [];
  @Input() tableHeader: any[] = [];
  @Input() checkbox: any
  @Input() viewer:any;
  @Output() selectedStudent = new EventEmitter<any>();

  constructor(private router:Router){}

  ngOnInit(){

  }

  route(page:any){
    this.router.navigate([page]);
  }

}
