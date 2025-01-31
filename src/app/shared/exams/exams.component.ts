import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent implements OnInit {

  visible = false;

  showDialog() {
      this.visible = true;
  }
  viewDropOut = false;
  examDetail:any;
  @Input() studentId:any;
  @Input() exams:any;
  @Input() examsId:any;
  @Input() viewer!:string;

  constructor(private api:HttpServiceService, private router: Router){}

  ngOnInit(){
  }

   


  // getStudentExamsResult(studentId:any){

  //   this.api.get(`students/exams/results?exam_id=${this.examsId}&student_id=${studentId}`).subscribe(
  //     res=>{
  //       this.examDetail = res;
  //       console.log('exams detail', this.examDetail)

  //     }, err=>{
  //       console.log(err)
  //     }
  //   )
  // }

  // toggleViewDropOut(id:any) {
  //   this.viewDropOut =!this.viewDropOut;
  //   this.examsId = id;
  //   this.getStudentExamsResult(id);
  // }

  route(page:string){
    this.router.navigate([page]);
  }

}
