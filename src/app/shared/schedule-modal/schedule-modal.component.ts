import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrl: './schedule-modal.component.scss'
})
export class ScheduleModalComponent {
  class:any;
  @Input() viewer!:string;
}
