import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/user.interface'
import { Auth0User } from '../interfaces/auth0user.interface';
import { APIResponse } from '../interfaces/APIResponse.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CohortService } from './cohort.service';
import { LessonService } from './lesson.service';
import { NoteService } from './note.service';
import { QuizService } from './quiz.service';
import { RetentionService } from './retention.service';
import { QuestionsService } from './questions.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class UserService {
  user$: Observable<Object>;

  constructor(
    private store: Store<RootState>,
    private auth: AuthService,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private cohorts: CohortService,
    private lessons: LessonService,
    private quiz: QuizService,
    private retention: RetentionService,
    private questions: QuestionsService
  ) {}

  // this function controls all data acquisition when the app initially loads.
  // be very careful changing this function
  setUserData() {
    this.user$ = this.auth.getUser$();
    this.user$.subscribe((auth: Auth0User) => {
      let authfirst: string = auth.given_name;
      let authlast: string = auth.family_name;
      let authuser = {
        first_name: auth.given_name,
        last_name: auth.family_name,
        email_address: auth.email
      }
      auth.email_address = auth.email
      this.store.dispatch(Actions.setUserInfo({ user: authuser }))
      this.http.post('/api/users/userinfo', auth).subscribe((response: APIResponse) => {
        if (response.success) {
          let data: User = response.data
          this.store.dispatch(Actions.setUserInfo({ user: data }))
          this.getInitialData(data)
          console.log("the user", data)
          if (data.first_name != authfirst || data.last_name != authlast) {
            let fixed: User = { ...data, first_name: auth.given_name, last_name: auth.family_name }
            this.http.put('/api/users/edit', fixed).subscribe(() => {
              this.snackbar.open("Profile updated to match your Google profile.", "OK")
            })
          }
        }
        else this.snackbar.open("Your profile could not be retrieved from the database.", "Close", { duration: 3000 })
      })
    });
  }

  getInitialData(user: User) {
    console.log("get initial data firing, with role of:",user.role_id,"and userid of",user.id);
    this.getAllUsers()
    this.cohorts.getUserCohortData(user)
    this.lessons.getUserLessonData(user)
    this.retention.getUserRetentionData(user)
    this.questions.getUserQuestionData(user)
    this.quiz.getUserQuizData(user)
  }

  getAllUsers() {
    this.http.get("/api/users/all").subscribe((res: APIResponse) => {
      if (res.success) {
        let data: User[] = res.data;
        this.store.dispatch(Actions.setUserList({ userlist: data }));
      } else
        this.snackbar.open(
          "The database could not retrieve user data.",
          "Close",
          { duration: 3000 }
        );
    });
  }

  activateUser(studentid: string, cohortid: string) {
    let activate = {
      userid: studentid,
      cohortid: cohortid,
    };
    this.http
      .post("api/users/activate", activate)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getAllUsers();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }

  updateUserRole(user: User) {
    this.http.put("/api/users/edit", user).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllUsers();
      } else
        this.snackbar.open(
          "The database encountered an error, your work did not save.",
          "Close",
          { duration: 3000 }
        );
    });
  }
}
