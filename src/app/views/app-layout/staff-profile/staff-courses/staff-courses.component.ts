import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { StorageService } from '../../../../services/storage.service';


@Component({
  selector: 'app-staff-courses',
  templateUrl: './staff-courses.component.html',
  styleUrl: './staff-courses.component.scss'
})
export class StaffCoursesComponent {
  staffCourses:any;
  staff_id:any;

  constructor(private router:Router, private api:HttpServiceService, private storage:StorageService) {}
  ngOnInit(){
    this.getStaffCourses()
  }

  getStaffCourses(){
    let uri:any;
    let userAccountType = this.storage.getdata('userAccountType')
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
