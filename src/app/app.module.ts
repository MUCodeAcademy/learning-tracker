import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { StudentLandingComponent } from './students/student-landing/student-landing.component';
import { InstructorLandingComponent } from './instructors/instructor-landing/instructor-landing.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    StudentLandingComponent,
    InstructorLandingComponent,
    AdminLandingComponent
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
