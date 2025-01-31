import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-applicants-profile',
  templateUrl: './applicants-profile.component.html',
  styleUrl: './applicants-profile.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class ApplicantsProfileComponent implements OnInit {
  @Input() applicant:any;
  @Output() approveApplication=new EventEmitter();
  @Output() rejectApplication=new EventEmitter();


  constructor(private api:HttpServiceService, private messageService: MessageService){}
  ngOnInit(){
    console.log('Application', this.applicant)
  }

  onApprove(id:any){
    this.approveApplication.emit();
    console.log('approving application')
    this.api.post(`applications/${id}/approve`, {}).subscribe(
      res=>{
        console.log('Application Approved', res)

      },
      err=>{
        console.log('Error Approving Application', err)
      }
    )

  }
  onReject(){
    this.rejectApplication.emit();
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
