import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.scss'
})
export class StaffProfileComponent {
  items: MenuItem[] | undefined;
   staff_id:any; currentMenu:any = 'general';

  profileData:any;
  staffCourses:any;
  assignments:any;

  constructor(private router:Router, private api:HttpServiceService) {}

  ngOnInit(){
    this.getProfile()
    this.getStaffCourses()
    this.getStudentAssignment()
  }



  getProfile(){
    this.api.get('staffs/profile').subscribe(
      res=>{
        this.profileData = res;
        console.log('profile data', this.profileData)

      }, err=>{
        console.log(err)
      }
    )
  }

  getStudentAssignment(){


    this.api.get('assignments?course_id=' + this.getParamsId()).subscribe(
      res=>{
        this.assignments = res;
        console.log('Student Exams data', this.assignments)

      }, err=>{
        console.log(err)
      }
    )
  }

  getStaffCourses(){
    this.api.get('staffs/courses?staff_id=' + this.getParamsId()).subscribe(
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

  toggleTab(menu:string){
    this.currentMenu = menu;
    console.log(this.currentMenu)
  }


  route(page:string){
    this.router.navigate([page]);
  }

}
