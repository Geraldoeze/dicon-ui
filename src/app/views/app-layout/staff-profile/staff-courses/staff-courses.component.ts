import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';


@Component({
  selector: 'app-staff-courses',
  templateUrl: './staff-courses.component.html',
  styleUrl: './staff-courses.component.scss'
})
export class StaffCoursesComponent implements OnInit {
  staffCourses:any;
  staff_id:any;
  democourses: any;

  constructor(private router:Router, private api:HttpServiceService, private storage:StorageService) {}
  ngOnInit(){
    this.getStaffCourses()

    this.democourses = [
      {
        course_code: 'CSC 101',
        course_name: 'Introduction to Computer Science',
        course_units: 4,
        total_videos: 10,
        students_no: 20
      },
      {
        course_code: 'CSC 102',
        course_name: 'Introduction to Programming',
        course_units: 4,
        total_videos: 10,
        students_no: 20
      },
      {
        course_code: 'CSC 103',
        course_name: 'Introduction to Web Development',
        course_units: 4,
        total_videos: 10,
        students_no: 20
      }
    ]
  }

  getStaffCourses(){
    let uri:any;
    const userAccountType = this.storage.getdata('userAccountType')
    if(userAccountType?.toLowerCase() === 'staff'){
      uri='staffs/courses'
    } else{
      uri='staffs/courses?staff_id=' + this.getParamsId()
    }
    this.api.get(uri).subscribe(
      res=>{
        this.staffCourses = res;
        console.log('staff courses', this.staffCourses)

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
