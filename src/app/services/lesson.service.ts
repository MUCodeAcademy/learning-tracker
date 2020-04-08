import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../interfaces/lesson.interface';
import { APIResponse } from '../interfaces/apiresponse.interface';
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient, private store: Store<RootState>, private snackbar: MatSnackBar) { }

  getAllLessons() {
    return this.http.get("/api/lessons/all").subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Lesson[] = res.data
        this.store.dispatch(Actions.setLessons({ lessons: data }))
      }
      else console.log("Couldn't get all lessons.")
    })
  };

  getLessonsbyCohort(id) {
    this.http.get(`/api/lessons/cohort/${id}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Lesson[] = res.data
          this.store.dispatch(Actions.setLessons({ lessons: data }))
        }
        else return console.log("Couldn't get lessons by cohort.")
      })
  }

  // * GET `'/api/lessons/all'` - gets all lessons

  newLesson(lesson: Lesson) {
    return this.http.post("/api/lessons/new", lesson).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllLessons()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  };;

  // * POST `'/api/lessons/new'` - creates a new lesson.   Requires cohortid, topicid, title, week, and day

  editLesson(lesson: Lesson) {
    return this.http.put("/api/lessons/edit", lesson).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllLessons()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  };;
  // * PUT `'/api/lessons/edit'` - updates a lesson.  Requires cohortid, topicid, title, week, day, and the id of the lesson.

  deleteLessson(id: number) {
    return this.http.delete(`/api/lessons/delete/${id}`).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllLessons()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  };;
  // * DELETE `'/api/lessons/delete/:id'` - deletes lesson with a given id

}
