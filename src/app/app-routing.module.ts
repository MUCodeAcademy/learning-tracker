import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { AdminLandingComponent } from './admin/admin-landing.component';
import { QuizLandingComponent } from './quiz/quiz-landing.component';
import { LessonLandingComponent } from './lesson/lesson-landing.component';
import { UserGuard } from './guards/user.guard'


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'quiz', component: QuizLandingComponent, canActivate: [UserGuard] },
  { path: 'lesson', component: LessonLandingComponent, canActivate: [UserGuard] },
  { path: 'admin', component: AdminLandingComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
