import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class ProgramsComponent implements OnInit {
  programes:any = []
  confirmDelete = false;
  addVideo = false
  files: any;
  imageSrc: any;
  isSubmitted: any;
  uploadForm:any;
  loading = false;
  departmentId:any;

  constructor(private fb: FormBuilder,
              private api: HttpServiceService,
              private messageService:MessageService,
              private router:Router){}

  ngOnInit(){


    this.uploadForm = this.fb.group({
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

    this.getProgrames(this.getParamsId())
  }

  route(page:any){
    this.router.navigate([page])
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.departmentId = segments[segments.length - 1];

    return this.departmentId;
  }


  getProgrames(departmentId:any){
    this.getParamsId()
    this.api.get('programs/' + departmentId).subscribe(
      res=>{
        this.programes = res
        console.log(this.programes)
      }, err=>{
        console.log(err);
      }
    )
  }

  onFileSelected(event: any): void {
    console.log('selection function hit');

    // Store all selected files
    this.files = Array.from(event.target.files);  // Converts FileList to an array of files

    console.log(this.files);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }



  toggleConfirmDelete(){
    this.confirmDelete =!this.confirmDelete;
  }

  toggleAddVideo(){
    this.addVideo = !this.addVideo;

  }

  get f() {
    return this.uploadForm.controls;
  }
  save() {

    this.api.post('', this.uploadForm.value).subscribe(
      res=>{
        console.log(res);
      }, err=>{
        console.log(err);
      }
    )
    this.showSuccess('Video uploaded successfully')
      this.toggleAddVideo()
    }


    deleteCourse(){
      this.api.delete('').subscribe(
        res=>{
          console.log(res);
        }, err=>{
          console.log(err);
        }
      )
    }

    showSuccess(message: string) {
      console.log('showSuccess')
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    showError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

}
