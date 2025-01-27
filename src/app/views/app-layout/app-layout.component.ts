import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  signout:boolean = false;
  loading:boolean = false;
  visible:boolean = false;
  showMobileMenu:boolean = false;
  is_mobileMenu:boolean = false;
  user:any;
  currentMenu:any = 'general';
  dropdown:boolean = false;
  userAccountType: any;
  random: any;
  studentPortal:any;
  staffPortal:any;
  userAcccountId:any;

  constructor(private router: Router, private storage: StorageService){}

  ngOnInit(){
    // this.user = this.storage.getJson('user');
    // console.log('layout check', this.user.email);
    this.initializeStorage();
    this.userAccountType = this.storage.getdata('userAccountType')?.toLocaleLowerCase();
    this.studentPortal = '/app/student-profile/' + this.storage.getdata('userAccountId')
    this.studentPortal = '/app/staff-profile/' + this.storage.getdata('userAccountId')
  }

  toggleMobileMenu(){
    console.log('show mobile menu');
    this.showMobileMenu =!this.showMobileMenu;
 
  }

  isActive(arg0: string): boolean {
    return this.router.isActive(arg0, true);
    }
  
    toggleTab(menu:string){
      this.currentMenu = menu;
      console.log(this.currentMenu)
    }
    
    initializeStorage(){
      this.storage.getdata('userAccountType');
    }
  
    toggleDropdown(){
      this.dropdown =!this.dropdown;
    }

 

  menu = [
    {
      "name": "Home",
      "icon": "assets/icons/layout.png",
      "route": "/home"
    },
    // {
    //   "name": "CSS",
    //   "icon": "assets/icons/layout.png",
    //   "route": "/css"
    // },
     {
      "name": "About",
      "icon": "assets/icons/layout.png",
      "route": "/about"

    },
    {
      "name": "PG Program",
      "icon": "assets/icons/package.png",
      "route": "/unndic"

    },
    {
      "name": "News & Blog",
      "icon": "assets/icons/reciept.png",
      "route": "/news"

    },
    {
      "name": "Contact Us",
      "icon": "assets/icons/cart.png",
      "route": "/contact"
    },
    {
      "name": "PG Application",
      "icon": "assets/icons/achive.png",
      "route": "/pg-application"
    },
    // {
    //   "name": "Commandants",
    //   "icon": "assets/icons/layout.png",
    //   "route": "/commandants"
    // },
  ]

  route(page:string){
    this.router.navigate([page]);
  }

  toggleSignout(){
    // this.signout = !this.signout;
    this.visible = !this.visible;
  }

  signOut(){
    this.storage.removeData('user')
    this.router.navigateByUrl('auth/login')
  }

}
