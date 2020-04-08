import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions'
import { Quiz } from '../interfaces/quiz.interface';
import { APIResponse } from '../interfaces/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, private store: Store<RootState>) { }

  getQuizById(id) {
    return this.http.get("/api/quiz/id/" + id).subscribe((res: APIResponse) => {
      let data: Quiz[] = res.data
      // this.store.dispatch(Actions.setQuizList ({ list: data }))
    })
  }

  getQuizzesByCohort(cohort) {
    return this.http.get("/api/quiz/cohort/" + cohort).subscribe((res: APIResponse) => {
      let data: Quiz[] = res.data
      // this.store.dispatch(Actions.setQuizList ({ list: data }))
    })
  }

  getAllQuizzes() {
    return this.http.get("/api/quiz/all").subscribe((res: APIResponse) => {
      let data: Quiz[] = res.data
      // this.store.dispatch(Actions.setQuizList ({ list: data }))
    })
  }

  createQuiz(quiz) {
    return this.http.post("/api/add", quiz).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllQuizzes()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  };

  editQuiz(quiz) {
    return this.http.put("/api/edit", quiz).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllQuizzes()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  };

  deleteQuizById(id) {
    return this.http.delete(`/api/quiz/delete/${id}`).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllQuizzes()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  };
}