import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.scss'
})
export class BatchesComponent implements OnInit {

  addBatch = false;
  departments:any;
  isSubmitted = false;
  loading = false;
  createBatchForm:any;
  confirmDelete = false;
  batches:any = [];

  constructor(private router: Router, private api: HttpServiceService, private fb: FormBuilder){}


  ngOnInit(){
    this.createBatchForm = this.fb.group({
      // Basic information
      productName: ['', Validators.required],
      warehouse: ['', Validators.required],
      vendor: ['', Validators.required],
    });

    this.getBatch();
  }
  get f() {
    return this.createBatchForm.controls;
  }

  toggleAddBatch(){
    this.addBatch =!this.addBatch;
  }

  toggleConfirmDelete(){
    this.confirmDelete =!this.confirmDelete;
  }

  getBatch(){
    this.api.get('batches/').subscribe(
      res=>{
        this.batches = res;
        console.log('batches', this.batches);
      }, err=>{
        console.log(err);
      }
    )
  }

  createBatch(){}


  route(page:string){
    this.router.navigate([page]);
  }
}
