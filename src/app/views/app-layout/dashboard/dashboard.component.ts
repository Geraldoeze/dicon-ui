import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class DashboardComponent implements OnInit {
  responsiveOptions: any[] | undefined;
    data: any;
    options: any=null;
    metrics: any=null;
    TopSellingProduct: any=null;
    recentApplications: any=null;
    pageLoading=false;
    calender=false;
    chartData:any[]=[]


    constructor(private api:HttpServiceService, private messageService:MessageService){}

    ngOnInit() {
      this.getMetrics()
      this.getRecentStudent()
    }


    getTopSellingProducts(){
      this.pageLoading = true;
      this.api.get('dashboard/products/topselling').subscribe(
        res=>{
          this.TopSellingProduct = res
          console.log(this.TopSellingProduct)
          this.pageLoading = false;
        }
      )
    }

    getMetrics(){
      this.api.get('dashboard/').subscribe(
        res=>{
          this.metrics = res;
          console.log(this.metrics)
        },
        err=>{
          this.showError('Error fetching metrics');
        }
      )
    }

    getRecentStudent(){
      this.api.get('applications/?page=1&page_size=3&status').subscribe(
        res=>{
          this.recentApplications = res;
          console.log('recent student',this.recentApplications)
        },
        err=>{
          this.showError('Error fetching metrics');
        }
      )

    }

    toggleCalender(){
      this.calender = !this.calender;
    }

    showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
