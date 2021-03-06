import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AdminLandingComponent } from './admin/admin-landing.component';
import { StoreModule } from '@ngrx/store';
import { QuizLandingComponent } from './quiz/quiz-landing.component';
import { LessonLandingComponent } from './lesson/lesson-landing.component';
import { reducers } from './store';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { CohortComponent } from './admin/cohort/cohort.component';
import { UseradminComponent } from './admin/useradmin/useradmin.component';
import { ActivateComponent } from './admin/activate/activate.component';
import { LessonSelectionComponent } from './lesson/lesson-selection/lesson-selection.component';
import { InstructorQuestionComponent } from "./lesson/instructor-question/instructor-question.component";
import { LessonDisplayComponent } from './lesson/lesson-display/lesson-display.component';
import { RetentionComponent } from './lesson/retention/retention.component';
import { NamefromidPipe } from './pipes/namefromid.pipe';
import { QuizSelectionComponent } from './quiz/quiz-selection/quiz-selection.component';
import { QuizDisplayComponent } from './quiz/quiz-display/quiz-display.component';
import { QuizEditComponent } from './quiz/quiz-edit/quiz-edit.component';
import { LessonEditComponent } from './lesson/lesson-edit/lesson-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    AdminLandingComponent,
    QuizLandingComponent,
    LessonLandingComponent,
    UnauthorizedComponent,
    ErrorComponent,
    HeaderComponent,
    CohortComponent,
    UseradminComponent,
    ActivateComponent,
    InstructorQuestionComponent,
    LessonSelectionComponent,
    RetentionComponent,
    LessonDisplayComponent,
    NamefromidPipe,
    QuizSelectionComponent,
    QuizDisplayComponent,
    LessonEditComponent,
    QuizEditComponent,
    InstructorQuestionComponent
  ],
  entryComponents: [LessonEditComponent, QuizEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
