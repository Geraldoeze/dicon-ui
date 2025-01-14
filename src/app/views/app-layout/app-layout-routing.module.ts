import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { ApplicationsComponent } from './applications/applications.component';
import { StaffsComponent } from './staffs/staffs.component';
import { StudentsComponent } from './students/students.component';
import { ReportsComponent } from './reports/reports.component';
import { BatchesComponent } from './batches/batches.component';
import { ApplicationDetailComponent } from './applications/application-detail/application-detail.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { BatchDetailComponent } from './batches/batch-detail/batch-detail.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { CourseContentDetailComponent } from './course-content/course-content-detail/course-content-detail.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { SupportComponent } from './support/support.component';
import { ProgramsComponent } from './programs/programs.component';
import { StudentCoursesComponent } from './student-profile/student-courses/student-courses.component';
import { StudentCAComponent } from './student-profile/student-c-a/student-c-a.component';
import { StudentFeesComponent } from './student-profile/student-fees/student-fees.component';
import { StudentExamsComponent } from './student-profile/student-exams/student-exams.component';



const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'courses', component: CoursesComponent},
      {path: 'courses/:id', component: CourseDetailComponent},
      {path: 'course-content/:id', component: CourseContentComponent},
      {path: 'programes/:id', component: ProgramsComponent},
      {path: 'course-content-detail/:id', component: CourseContentDetailComponent},
      {path: 'applications', component: ApplicationsComponent},
      {path: 'applications/:id', component: ApplicationDetailComponent},
      {path: 'staff', component: StaffsComponent},
      {path: 'staff-profile/:id', component: StaffProfileComponent},
      {path: 'students', component: StudentsComponent},
      {path: 'students/:id', component: StudentDetailComponent},
      {path: 'student-profile/exams', component:StudentExamsComponent},
      {path: 'student-profile/fees', component:StudentFeesComponent},
      {path: 'student-profile/c-a', component:StudentCAComponent},
      {path: 'student-profile/courses', component:StudentCoursesComponent},
      {path: 'student-profile/:id', component: StudentProfileComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'batches', component: BatchesComponent},
      {path: 'batches/:id', component: BatchDetailComponent},
      {path: 'support', component: SupportComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
