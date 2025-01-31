import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  baseUrl = 'https://dic.0ps.tech/api/'
  constructor(private http: HttpClient, private storage: StorageService) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getdata('access_token')}`,
      })
    };
  }


  post(endpoint:string, data:any){
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.baseUrl + endpoint, data, this.getHttpOptions())
  }

  get(endpoint:string){
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.baseUrl + endpoint, httpOptions)
  }

  update(endpoint:string, data:any){
    const httpOptions = this.getHttpOptions();
    return this.http.put(this.baseUrl + endpoint, data, httpOptions)
  }

  delete(endpoint:string){
    const httpOptions = this.getHttpOptions();
    return this.http.delete(this.baseUrl + endpoint, httpOptions)
  }

  patch(endpoint:string){
    const httpOptions = this.getHttpOptions();
    return this.http.patch(this.baseUrl + endpoint, httpOptions)
  }

}
