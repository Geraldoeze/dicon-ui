import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {
  createSupportForm:any;

  constructor(private api:HttpServiceService, private fb: FormBuilder){}

  ngOnInit(){

  }

  createSupport(){
    this.api.post('', this.createSupportForm).subscribe(
      res=>{
        console.log(res)
      }, err=>{
        console.log(err)
      }
    )
  }

}
