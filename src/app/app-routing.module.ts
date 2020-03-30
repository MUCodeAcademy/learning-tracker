import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { StudentLandingComponent } from './students/student-landing/student-landing.component';
import { InstructorLandingComponent } from './instructors/instructor-landing/instructor-landing.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'student', component: StudentLandingComponent },
  { path: 'instructor', component: InstructorLandingComponent },
  { path: 'admin', component: AdminLandingComponent },
  { path: '', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
