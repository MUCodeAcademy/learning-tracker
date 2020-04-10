import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RootState } from "../store";
import { Store } from "@ngrx/store";
import * as Actions from "../store/actions";
import * as Selectors from '../store/selectors'
import { Quiz } from "../interfaces/quiz.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { combineLatest, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { map } from 'rxjs/operators';
import { Cohort } from '../interfaces/cohort.interface';
import { Enrollment } from '../interfaces/enrollment.interface';
import { APIResponse } from '../interfaces/APIResponse.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { QuizEditComponent } from '../quiz/quiz-edit/quiz-edit.component';

@Injectable({
  providedIn: "root",
})
export class QuizService {
  user$: Observable<User>
  user: User

  constructor(private http: HttpClient, private store: Store<RootState>, private snackbar: MatSnackBar) {
    this.user$ = this.store.select(Selectors.getUserInfo)
    this.user$.subscribe((res: User) => this.user = res)
  }

  getUserQuizData(user?: User) {
    let thisuser
    if (!user && this.user != "") {
      thisuser = this.user
    }
    else thisuser = user
    let cohortlist$ = this.store.select(Selectors.getCohortList)
    let enrollment$ = this.store.select(Selectors.getUserEnrollment)
    combineLatest([cohortlist$, enrollment$]).pipe(map(([list, enrollment]) => ({ list, enrollment }))).subscribe(res => {
      let clist: Cohort[] = res.list
      let enroll: Enrollment = res.enrollment
        if (thisuser.role_id === "1") {
          this.getAllQuizzes()
        }
        else if (thisuser.role_id === "2" && clist.length > 0) {
          let mycohorts = clist.filter((cohort: Cohort) => { return cohort.instructor_id == thisuser.id })
          this.getQuizzesByCohort(mycohorts[0].id)
        }
        else if (thisuser.role_id === "3" && enroll.cohort_id) {
          console.log("requesting quizzes for cohort", enroll.cohort_id)
          this.getQuizzesByCohort(enroll.cohort_id)
        }
    })
  }

  getQuizById(id) {
    return this.http.get("/api/quiz/id/" + id).subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Quiz[] = res.data;
        this.store.dispatch(Actions.getQuizzes({ quizzes: data }))
      } else console.log("Couldn't get quiz by ID.");
    });
  }

  getQuizzesByCohort(cohort) {
    return this.http
      .get(`/api/quiz/cohort/${cohort}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Quiz[] = res.data;
          console.log("sending quizzes by cohort to state", data)
          this.store.dispatch(Actions.getQuizzes({ quizzes: data }))
        } else console.log("Couldn't get quizzes by cohort.");
      });
  }

  getAllQuizzes() {
    return this.http.get("/api/quiz/all").subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Quiz[] = res.data;
        this.store.dispatch(Actions.getQuizzes({ quizzes: data }))
      } else console.log("Couldn't get quizzes.");
    });
  }

  createQuiz(quiz, dialog: MatDialogRef<QuizEditComponent>) {
    console.log(quiz);
    return this.http.post("/api/quiz/add", quiz).subscribe((res: APIResponse) => {
      if (res.success) {
        dialog.close();
        this.getUserQuizData();
      } else
        this.snackbar.open(
          "The database encountered an error, your work did not save.",
          "Close",
          { duration: 3000 }
        );
    });
  }

  editQuiz(quiz, dialog: MatDialogRef<QuizEditComponent>) {
    console.log(quiz);
    return this.http.put("/api/quiz/edit", quiz).subscribe((res: APIResponse) => {
      if (res.success) {
        dialog.close();
        this.getUserQuizData();
      } else
        this.snackbar.open(
          "The database encountered an error, your work did not save.",
          "Close",
          { duration: 3000 }
        );
    });
  }

  deleteQuizById(id) {
    return this.http
      .delete(`/api/quiz/delete/${id}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getUserQuizData();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }
}
