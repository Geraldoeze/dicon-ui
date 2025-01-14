import { PrimengModule } from './../../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AppLayoutComponent } from './app-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StaffsComponent } from './staffs/staffs.component';
import { CoursesComponent } from './courses/courses.component';
import { ReportsComponent } from './reports/reports.component';
import { ApplicationsComponent } from './applications/applications.component';
import { BatchesComponent } from './batches/batches.component';
import { BatchDetailComponent } from './batches/batch-detail/batch-detail.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { ApplicationDetailComponent } from './applications/application-detail/application-detail.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { CourseContentDetailComponent } from './course-content/course-content-detail/course-content-detail.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { GeneralInfoComponent } from './student-profile/general-info/general-info.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffGeneralInfoComponent } from './staff-profile/staff-general-info/staff-general-info.component';
import { SupportComponent } from './support/support.component';
import { ProgramsComponent } from './programs/programs.component';
import { StudentCAComponent } from './student-profile/student-c-a/student-c-a.component';
import { StudentFeesComponent } from './student-profile/student-fees/student-fees.component';
import { StudentExamsComponent } from './student-profile/student-exams/student-exams.component';
import { StudentCoursesComponent } from './student-profile/student-courses/student-courses.component';




@NgModule({
  declarations: [
    AppLayoutComponent,
    DashboardComponent,
    StudentsComponent,
    StaffsComponent,
    CoursesComponent,
    ReportsComponent,
    ApplicationsComponent,
    BatchesComponent,
    BatchDetailComponent,
    CourseDetailComponent,
    StudentDetailComponent,
    ApplicationDetailComponent,
    CourseContentComponent,
    CourseContentDetailComponent,
    StudentProfileComponent,
    GeneralInfoComponent,
    StaffProfileComponent,
    StaffGeneralInfoComponent,
    SupportComponent,
    ProgramsComponent,
    StudentCAComponent,
    StudentFeesComponent,
    StudentExamsComponent,
    StudentCoursesComponent
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    FormsModule,
    
  ]
})
export class AppLayoutModule { }
