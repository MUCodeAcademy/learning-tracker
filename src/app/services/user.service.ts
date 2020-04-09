import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import * as Selectors from '../store/selectors'
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/user.interface'
import { Auth0User } from '../interfaces/authouser.interface';
import { APIResponse } from '../interfaces/apiresponse.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CohortService } from './cohort.service';
import { LessonService } from './lesson.service';
import { NoteService } from './note.service';
import { QuizService } from './quiz.service';
import { RetentionService } from './retention.service';
import { QuestionsService } from './questions.service';
import { Enrollment } from '../interfaces/enrollment.interface';
import { Cohort } from '../interfaces/cohort.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>;

  constructor(private store: Store<RootState>, private auth: AuthService, private http: HttpClient,
    private snackbar: MatSnackBar, private cohorts: CohortService, private lessons: LessonService,
    private notes: NoteService, private quiz: QuizService, private retention: RetentionService,
    private questions: QuestionsService) { }


  // this function controls all data acquisition when the app initially loads.
  // be very careful changing this function
  setUserData() {
    this.user$ = this.auth.getUser$()
    this.user$.subscribe((auth: Auth0User) => {
      let authfirst: string = auth.given_name
      let authlast: string = auth.family_name
      let authuser = {
        first_name: auth.given_name,
        last_name: auth.family_name,
        email_address: auth.email
      }
      this.store.dispatch(Actions.setUserInfo({ user: authuser }))
      this.http.post('/api/users/userinfo', authuser).subscribe((response: APIResponse) => {
        if (response.success) {
          let data: User = response.data
          this.store.dispatch(Actions.setUserInfo({ user: data }))
          this.getInitialData(data.role_id, data.id)
          if (data.first_name != authfirst || data.last_name != authlast) {
            let fixed: User = { ...data, first_name: auth.given_name, last_name: auth.family_name }
            this.http.put('/api/users/edit', fixed).subscribe(res => {
              this.snackbar.open("Profile updated to match your Google profile.", "OK")
            })
          }
        }
        else this.snackbar.open("Your profile could not be retrieved from the database.", "Close", { duration: 3000 })
      })
    });
  }

  getInitialData(roleid: string, id: string) {
    console.log("get initial data firing, with role of:", roleid, "and userid of", id)
    if (roleid === "1") {
      this.getAllUsers()
      this.cohorts.getAllCohorts()
      this.cohorts.getCohortEnrollment()
      this.lessons.getAllLessons()
      this.notes.getAllNotes()
      this.quiz.getAllQuizzes()
      this.retention.getAllRetentions()
      this.questions.allQuestions()
      console.log("Done fetching data for an admin")
    }
    if (roleid === "3") {
      this.cohorts.getStudentEnrollment(id)
      this.getAllUsers()
      this.cohorts.getAllCohorts()
      this.notes.notesByStudent(id)
      this.retention.getRetentionByStudent(id)
      let enrollment$ = this.store.select(Selectors.getUserEnrollment)
      enrollment$.subscribe((enrollment: Enrollment) => {
        if (enrollment.cohort_id > 0) {
          this.quiz.getQuizzesByCohort(enrollment.cohort_id)
          this.questions.byCohortId(enrollment.cohort_id)
          this.lessons.getLessonsbyCohort(enrollment.cohort_id)
        }
      })
      console.log("done getting student's data")
    }
    if (roleid === "2") {
      this.cohorts.getAllCohorts()
      this.getAllUsers()
      this.cohorts.getCohortEnrollment()
      let cohorts$ = this.store.select(Selectors.getCohortList)
      cohorts$.subscribe(res => {
        console.log(res, "should be cohort enrollment")
        if (res && res.length > 0) {
        let assigned = res.filter((obj: Cohort) => {
          let iid = obj.instructor_id;
          if (iid.toString() === id) {return true}})
        console.log("assigned cohort array", assigned)
        assigned.sort((a, b) => b.id - a.id)
        // should put latest cohort last .. for now
        let cohort 
        if (assigned.length > 0) {
          cohort = assigned[0].id
        }
        if (cohort != undefined) {
        // this code doesn't support an instructor with multiple cohorts, api endpoints don't do this
        this.notes.notesByCohort(cohort)
        this.lessons.getLessonsbyCohort(cohort)
        this.quiz.getQuizzesByCohort(cohort)
        this.retention.getRetentionByCohort(cohort)
        this.questions.byCohortId(cohort)
      }}})
      console.log("done fetching data for an instructor")
    }
  }


  getAllUsers() {
    this.http.get('/api/users/all').subscribe((res: APIResponse) => {
      if (res.success) {
        let data: User[] = res.data
        this.store.dispatch(Actions.setUserList({ userlist: data }))
      }
      else this.snackbar.open("The database could not retrieve user data.", "Close", { duration: 3000 })
    })
  }

  activateUser(studentid: string, cohortid: string) {
    let activate = {
      userid: studentid,
      cohortid: cohortid
    }
    this.http.post('api/users/activate', activate).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllUsers()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  }

  updateUserRole(user: User) {
    this.http.put('/api/users/edit', user).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllUsers()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  }

}
