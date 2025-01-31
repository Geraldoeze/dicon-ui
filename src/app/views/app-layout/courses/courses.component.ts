import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  addCourse = false;
  departments:any;
  isSubmitted = false;
  loading = false;
  confirmDelete = false;
  createCourseForm:any;
  programes:any;

  constructor(private router: Router, private api: HttpServiceService, private fb: FormBuilder){}


  ngOnInit(){
    this.createCourseForm = this.fb.group({
      // Basic information
      productName: ['', Validators.required],
      warehouse: ['', Validators.required],
      vendor: ['', Validators.required],
      code: [''],
      sku: ['', Validators.required],
      image: ['', Validators.required],
      barcode: [''],

      // Sales information
      price: ['', [Validators.required, Validators.min(0)]],

      // Inventory
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
    });

    this.getDepatartments();
    this.getProgrames();
  }

  getDepatartments(){
    this.api.get('departments/').subscribe(
      res=>{
        this.departments = res
        console.log(this.departments)
      }, err=>{
        console.log(err);
      }
    )
  }


  getProgrames(){
    this.api.get('programs/').subscribe(
      res=>{
        this.programes = res
        console.log(this.departments)
      }, err=>{
        console.log(err);
      }
    )
  }

  toggleAddCourse(){
    this.addCourse =!this.addCourse;
  }

  toggleConfirmDelete(){
    this.confirmDelete =!this.confirmDelete;
  }


  get f() {
    return this.createCourseForm.controls;
  }

  createCourse(){
    // this.toggleAddCourse();
    this.api.post('', this.createCourseForm.value).subscribe(
      res=>{
        console.log(res);
      }, err=>{
        console.log(err);
      }
    )
  }


  route(page:string){
    this.router.navigate([page]);
  }

}
