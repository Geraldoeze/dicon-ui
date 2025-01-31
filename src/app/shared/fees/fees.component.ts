import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss'
})
export class FeesComponent {
  calender = false;
  tableHeader:any = ['Name', 'Fee', 'session', 'amount', 'Status'];
  fees: any[] = [
    { name: 'John Doe', fee: 'Tuition', session: '2023-2024', amount: 5000, status: 'Paid' },
    { name: 'Jane Smith', fee: 'Library', session: '2023-2024', amount: 300, status: 'Pending' },
    { name: 'Michael Johnson', fee: 'Lab', session: '2023-2024', amount: 1200, status: 'Paid' },
    { name: 'Emily Davis', fee: 'Sports', session: '2023-2024', amount: 400, status: 'Pending' },
    { name: 'Sarah Brown', fee: 'Hostel', session: '2023-2024', amount: 2500, status: 'Paid' },
  ];

  constructor(private router:Router){}
  route(page:string){
    this.router.navigate([page]);
  }
  toggleCalender(){
    this.calender = !this.calender;
  }

}
