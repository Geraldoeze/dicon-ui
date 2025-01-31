import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isActive(arg0: string): boolean {
  return this.router.isActive(arg0, true);
  }

  toggleTab(menu:string){
    this.currentMenu = menu;
    console.log(this.currentMenu)
  }

  dropdown = false;
  userAccountType: any;
  random: any;
  studentPortal:any;
  staffPortal:any;
  userAcccountId:any;
  currentMenu:any = 'general';


  constructor(private router: Router, private storage: StorageService, private auth: AuthService){}

  ngOnInit(){
   
    this.initializeStorage();
    this.userAccountType = this.storage.getdata('userAccountType')?.toLocaleLowerCase();
    this.studentPortal = '/app/student-profile/' + this.storage.getdata('userAccountId')
    this.studentPortal = '/app/staff-profile/' + this.storage.getdata('userAccountId')

  }

  initializeStorage(){
    this.storage.getdata('userAccountType');
  }

   



  toggleDropdown(){
    this.dropdown =!this.dropdown;
  }

  route(page:string){
    this.router.navigateByUrl(page)
  }

}
