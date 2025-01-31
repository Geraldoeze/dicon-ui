import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrl: './courses-card.component.scss'
})
export class CoursesCardComponent {
  calender = false;
  @Input() viewer!:string;
  @Input() courses:any;

  constructor(private router:Router){}
  route(page:string){
    this.router.navigate([page]);
  }

  toggleCalender(){
    this.calender = !this.calender;
  }

}
