import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { AdminLandingComponent } from './admin/admin-landing.component';
import { QuizLandingComponent } from './quiz/quiz-landing.component';
import { LessonLandingComponent } from './lesson/lesson-landing.component';
import { ErrorComponent } from './error/error.component';
import { UserGuard } from './guards/user.guard';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'quiz', component: QuizLandingComponent, canActivate: [UserGuard] },
  { path: 'lesson', component: LessonLandingComponent, canActivate: [UserGuard] },
  { path: 'admin', component: AdminLandingComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
