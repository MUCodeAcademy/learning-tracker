import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RootState } from "../store";
import { Store } from "@ngrx/store";
import * as Actions from "../store/actions";
import { Quiz } from "../interfaces/quiz.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { APIResponse } from '../interfaces/APIResponse.interface';

@Injectable({
  providedIn: "root",
})
export class QuizService {
  constructor(
    private http: HttpClient,
    private store: Store<RootState>,
    private snackbar: MatSnackBar
  ) {}

  getQuizById(id) {
    return this.http.get("/api/quiz/id/" + id).subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Quiz[] = res.data;
        // this.store.dispatch(Actions.setQuizList ({ list: data }))
      } else console.log("Couldn't get quiz by ID.");
    });
  }

  getQuizzesByCohort(cohort) {
    return this.http
      .get(`/api/quiz/cohort/${cohort}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Quiz[] = res.data;
          // this.store.dispatch(Actions.setQuizList ({ list: data }))
        } else console.log("Couldn't get quizzes by cohort.");
      });
  }

  getAllQuizzes() {
    return this.http.get("/api/quiz/all").subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Quiz[] = res.data;
        // this.store.dispatch(Actions.setQuizList ({ list: data }))
      } else console.log("Couldn't get quizzes.");
    });
  }

  createQuiz(quiz) {
    return this.http.post("/api/add", quiz).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllQuizzes();
      } else
        this.snackbar.open(
          "The database encountered an error, your work did not save.",
          "Close",
          { duration: 3000 }
        );
    });
  }

  editQuiz(quiz) {
    return this.http.put("/api/edit", quiz).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllQuizzes();
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
          this.getAllQuizzes();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }
}
