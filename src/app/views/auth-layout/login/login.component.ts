import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { DataService } from '../../../services/data.service';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent {
  loginForm!: any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  hidePassword: boolean = true;
  toastType!:string;
  response:any;
  user: any;

  constructor(private auth: AuthService,
              private api: HttpServiceService,
              private fb: FormBuilder,
              private router: Router,
              private data: DataService,
              private messageService: MessageService,
              private storage: StorageService){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f(){return this.loginForm.controls;}


  RouteUser(user:any){
      console.log('user', user);
      if(user[0].account_type.toLowerCase() == 'student'){
        this.router.navigate(['/app/student-profile/' + user[0].id]);
      }else if(user[0].account_type.toLowerCase() == 'staff'){
        this.router.navigate(['/app/staff-profile/' + user[0].id]);
      }else if(user[0].account_type.toLowerCase() == 'admin'){
        this.router.navigate(['/app/dashboard']);
      }
      this.loading = false;

  }

  login(){
    const formData = new FormData();
    formData.set('username', this.loginForm.get('email')?.value);
    formData.set('password', this.loginForm.get('password')?.value);

    this.auth.login(formData).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.response = res;
        this.storage.savedata('access_token', this.response.access_token)
        this.storage.saveJson('user', this.response.user)
        this.showSuccess('login successfull!')
        console.log('login successfull!')
        console.log(this.response)

        this.RouteUser(this.getCurrentUsers())

      },
      (err) => {
        console.error(err);
        this.showError('Invalid email or password!')
        this.loading = false;
      }
    );

  }

  getCurrentUsers(){
    let currentUser:any;
    this.api.get('auth/user').subscribe(
      res=>{
        currentUser = res;
        console.log('current user', currentUser)
        this.storage.savedata('userAccountType', currentUser[0].account_type);
        this.storage.savedata('userAccountId', currentUser[0].id);
        this.RouteUser(currentUser);
      }, err=>{
        console.log(err)
      }
    )

    return currentUser;
  }

  viewPassword(){
    this.hidePassword =!this.hidePassword;
  }

  showSuccess(message:string) {
    console.log(message);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
