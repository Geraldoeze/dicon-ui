import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss'
})
export class StudentTableComponent {
  @Input() showHeader: boolean = false;
  @Input() tableTitle!: string;
  @Input() students: any[] = [];
  @Input() studentCourses: any[] = [];
  @Input() tableHeader: any[] = [];
  @Input() checkbox: any
  @Input() viewer:any;
  @Output() selectedStudent: EventEmitter<any> = new EventEmitter();

  constructor(private router:Router){}

  ngOnInit(){

  }

  route(page:any){
    this.router.navigate([page]);
  }

}
