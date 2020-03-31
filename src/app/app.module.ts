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
import { LessonLandingComponent } from './lesson//lesson-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    AdminLandingComponent,
    QuizLandingComponent,
    LessonLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
