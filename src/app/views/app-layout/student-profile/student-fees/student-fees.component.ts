import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';


@Component({
  selector: 'app-student-fees',
  templateUrl: './student-fees.component.html',
  styleUrl: './student-fees.component.scss'
})
export class StudentFeesComponent {
  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router){}

  ngOnInit(){

  }
}
