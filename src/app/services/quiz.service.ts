import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }
}


getQuizById(id){
  return this.http.get("/api/quiz/id/"+id)
}

getQuizzesByCohort(cohort){
  return this.http.get("/api/quiz/cohort/"+cohort)
}

getAllQuizzes(){
  return this.http.get("/api/quiz/all")
}

createQuiz(quiz){
  return this.http.post("/api/add", quiz)
}

editQuiz(quiz){
  return this.http.put("/api/edit", quiz)
}

deleteQuizById(id){
  return this.http.delete("/api/quiz/delete/"+id)
}