import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';


@Component({
  selector: 'app-staff-exams',
  templateUrl: './staff-exams.component.html',
  styleUrl: './staff-exams.component.scss'
})
export class StaffExamsComponent implements OnInit {
  studentExams:any;
  studentExam: any;
  staff_id:any;

  constructor(private api:HttpServiceService, private storage:StorageService, private router:Router){}

  ngOnInit(){
    this.getStudentExams();

    this.studentExam = [
      {
        code: 'ELE 321',
        course: 'Algebra',
        unit: '4 Units',
        department: 'Mathematics',
        exam_date: '2024-03-24',
        time_range: '10:00 - 12:00',
        passing_percentage: 40,
        scored_percentage: 85,
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Physics',
        course: 'Quantum Mechanics',
        exam_date: '2024-03-25',
        time_range: '14:00 - 16:00',
        passing_percentage: 50,
        scored_percentage: 72,
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Chemistry',
        course: 'Organic Chemistry',
        exam_date: '2024-03-26',
        time_range: '10:00 - 12:00',
        passing_percentage: 60,
        scored_percentage: 65,
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Biology',
        course: 'Genetics',
        exam_date: '2024-03-27',
        time_range: '14:00 - 16:00',
        passing_percentage: 70,
        scored_percentage: 'pending',
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Computer Science',
        course: 'Data Structures',
        exam_date: '2024-03-28',
        time_range: '10:00 - 12:00',
        passing_percentage: 80,
        scored_percentage: 75,
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Computer Science',
        course: 'Data Structures',
        exam_date: '2024-03-28',
        time_range: '10:00 - 12:00',
        passing_percentage: 80,
        scored_percentage: 'pending',
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Computer Science',
        course: 'Data Structures',
        exam_date: '2024-03-28',
        time_range: '10:00 - 12:00',
        passing_percentage: 80,
        scored_percentage: 75,
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Computer Science',
        course: 'Data Structures',
        exam_date: '2024-03-28',
        time_range: '10:00 - 12:00',
        passing_percentage: 80,
        scored_percentage: 75,
      },
      {
        code: 'ELE 321',
        unit: '4 Units',
        department: 'Computer Science',
        course: 'Data Structures',
        exam_date: '2024-03-28',
        time_range: '10:00 - 12:00',
        passing_percentage: 80,
        scored_percentage: 'pending',
      },
    ];

  }

   
  getStudentExams(){
    let uri:any;
    const userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'staff'){
      uri='staffs/courses'
    } else{
      uri='staffs/courses?staff_id=' + this.getParamsId()
    }


    this.api.get(uri).subscribe(
      res=>{
        console.log('exams data', res)
        this.studentExams = res;
        console.log('exams data', this.studentExams)

      }, err=>{
        console.log(err)
      }
    )
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.staff_id = segments[segments.length - 1];

    return this.staff_id;
  }

  route(page:string){
    this.router.navigate([page]);
  }
}
