import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../interfaces/lesson.interface';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  getAllLessons() {
    return this.http.get("/api/lessons/all");
  }
  // * GET `'/api/lessons/all'` - gets all lessons

  newLesson(lesson: Lesson) {
    return this.http.post("/api/lessons/new", lesson);
  }
  // * POST `'/api/lessons/new'` - creates a new lesson.   Requires cohortid, topicid, title, week, and day

  editLesson(lesson: Lesson) {
    return this.http.put("/api/lessons/edit", lesson);
  }
  // * PUT `'/api/lessons/edit'` - updates a lesson.  Requires cohortid, topicid, title, week, day, and the id of the lesson.

  deleteLessson(id: number) {
    return this.http.delete("/api/lessons/delete/"+id);
  }
  // * DELETE `'/api/lessons/delete/:id'` - deletes lesson with a given id

}
