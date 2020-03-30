import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { AdminLandingComponent } from './admin/admin-landing.component';
import { QuizLandingComponent } from './quiz/quiz-landing.component';
import { LessonLandingComponent } from './lesson/lesson-landing.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'quiz', component: QuizLandingComponent },
  { path: 'lesson', component: LessonLandingComponent },
  { path: 'admin', component: AdminLandingComponent },
  { path: '', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
