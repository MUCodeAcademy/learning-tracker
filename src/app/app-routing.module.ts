import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { AdminLandingComponent } from './admin/admin-landing.component';
import { QuizLandingComponent } from './quiz/quiz-landing.component';
import { LessonLandingComponent } from './lesson/lesson-landing.component';
import { UserGuard } from './guards/user.guard'
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ErrorComponent } from './error/error.component';
import { RetentionComponent } from './components/retention/retention.component';




const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'retention', component: RetentionComponent},
  { path: 'quiz', component: QuizLandingComponent, canActivate: [UserGuard] },
  { path: 'lesson', component: LessonLandingComponent, canActivate: [UserGuard] },
  { path: 'admin', component: AdminLandingComponent },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: '**', component: ErrorComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
