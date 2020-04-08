import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../interfaces/lesson.interface';
import { APIResponse } from '../interfaces/apiresponse.interface';
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions'

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient, private store: Store<RootState>) { }

  getAllLessons() {
    return this.http.get("/api/lessons/all").subscribe((res: APIResponse) => {
      let data: Lesson[] = res.data
      this.store.dispatch(Actions.setLessons({ lessons: data }))
    })
  };
  
  // * GET `'/api/lessons/all'` - gets all lessons

  newLesson(lesson: Lesson) {
    return this.http.post("/api/lessons/new", lesson).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllLessons()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  };;
  
  // * POST `'/api/lessons/new'` - creates a new lesson.   Requires cohortid, topicid, title, week, and day

  editLesson(lesson: Lesson) {
    return this.http.put("/api/lessons/edit", lesson).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllLessons()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  };;
  // * PUT `'/api/lessons/edit'` - updates a lesson.  Requires cohortid, topicid, title, week, day, and the id of the lesson.

  deleteLessson(id: number) {
    return this.http.delete(`/api/lessons/delete/${id}`).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllLessons()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  };;
  // * DELETE `'/api/lessons/delete/:id'` - deletes lesson with a given id

}
