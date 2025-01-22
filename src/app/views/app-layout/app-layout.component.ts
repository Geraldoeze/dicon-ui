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
  user:any;

  constructor(private router: Router, private storage: StorageService){}

  ngOnInit(){
    // this.user = this.storage.getJson('user');
    // console.log('layout check', this.user.email);
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
