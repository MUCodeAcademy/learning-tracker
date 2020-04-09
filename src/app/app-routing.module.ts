import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { AdminLandingComponent } from './admin/admin-landing.component';
import { QuizLandingComponent } from './quiz/quiz-landing.component';
import { LessonLandingComponent } from './lesson/lesson-landing.component';
import { UserGuard } from './guards/user.guard'
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ErrorComponent } from './error/error.component';
import { CohortComponent } from './admin/cohort/cohort.component';
import { UseradminComponent } from './admin/useradmin/useradmin.component';
import { ActivateComponent } from './admin/activate/activate.component';





const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'quiz', component: QuizLandingComponent, canActivate: [UserGuard] },
  { path: 'lesson', component: LessonLandingComponent, canActivate: [UserGuard] },
  { path: 'admin', component: AdminLandingComponent, children: [
    { path: 'activate', component: ActivateComponent },
    { path: 'cohort', component: CohortComponent },
    { path: 'useradmin', component: UseradminComponent },
    { path: '', redirectTo: 'activate', pathMatch: 'prefix' }
  ] },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: '**', component: ErrorComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
