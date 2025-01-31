import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss',
  providers: [MessageService]  // Add MessageService to your component providers
})
export class StaffsComponent implements OnInit {
  addStaff = false;
  createStaffForm:any;
  isSubmitted = false;
  confirmDelete = false;
  files:any;
  loading = false;
  imageSrc:any;
  accommodationImageSrc:any;
  viewImages=false;
  loadings=false;
  genders: any = ['Male', 'Female'];
  courses: any = ['Mathematics', 'Science', 'English', 'Social Studies', 'History', 'Geography'];
  batches: any = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4', 'Batch 5'];
  staff = [
    {
      "department": "Global Security and Terrorism",
      "first_name": "Bello",
      "last_name": "Ahmed",
      "next_of_kin": "Jigawa",
      "state": "Jigawa",
      "LGA": "Dutse",
      "address": "Plot no. 116 Lane number 4 Abuja Crescent",
      "phone_number": "0814412345",
      "email_address": "student@gmail.com",
      "course_start": "17 Jan 2023",
      "course_end": "17 Jan 2023"
    },
    {
      "department": "International Trade and Economics",
      "first_name": "Grace",
      "last_name": "Oluwafemi",
      "next_of_kin": "Lagos",
      "state": "Lagos",
      "LGA": "Ikeja",
      "address": "12 Opebi Road, Ikeja, Lagos",
      "phone_number": "0810123456",
      "email_address": "grace.oluwafemi@gmail.com",
      "course_start": "10 Feb 2023",
      "course_end": "10 Dec 2023"
    },
    {
      "department": "Human Rights and Humanitarian Intervention",
      "first_name": "John",
      "last_name": "Okoro",
      "next_of_kin": "Enugu",
      "state": "Enugu",
      "LGA": "Nsukka",
      "address": "45 University Road, Nsukka",
      "phone_number": "0709876543",
      "email_address": "john.okoro@yahoo.com",
      "course_start": "5 Mar 2023",
      "course_end": "5 Mar 2024"
    },
    {
      "department": "Climate Change and Global Governance",
      "first_name": "Aisha",
      "last_name": "Abubakar",
      "next_of_kin": "Kano",
      "state": "Kano",
      "LGA": "Nassarawa",
      "address": "23 Kano Crescent, Nassarawa",
      "phone_number": "0802233445",
      "email_address": "aisha.abubakar@hotmail.com",
      "course_start": "15 Apr 2023",
      "course_end": "15 Oct 2023"
    },
    {
      "department": "Diplomacy and Conflict Resolution",
      "first_name": "David",
      "last_name": "Eze",
      "next_of_kin": "Abuja",
      "state": "FCT",
      "LGA": "Garki",
      "address": "10 Hospital Road, Garki, Abuja",
      "phone_number": "0901122334",
      "email_address": "david.eze@outlook.com",
      "course_start": "20 May 2023",
      "course_end": "20 May 2028"
    }
  ]


  tableHeader = ['Name', 'Programe', 'phone_number', 'Enrolement date']



  constructor(private fb:FormBuilder,
              private api:HttpServiceService,
              private messageService: MessageService){}


  ngOnInit(){
    this.createStaffForm = this.fb.group({
      // Basic information
      productName: ['', Validators.required],
      warehouse: ['', Validators.required],

    });


  }

  getStaff(){
    this.api.get('').subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }


  get f() {
    return this.createStaffForm.controls;
  }

  save() {
    this.isSubmitted = true;

    this.showSuccess('staff added successfully')
    this.toggleAddStaff();

    this.api.post('', this.createStaffForm).subscribe(
      res=>{
        console.log(res);
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

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  toggleConfirmDelete(){
    this.confirmDelete =!this.confirmDelete;
  }

  toggleAddStaff(){
    this.addStaff =!this.addStaff;
  }
}
