import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RootState } from "../store";
import { Store } from "@ngrx/store";
import * as Actions from "../store/actions/instructorquestion.action";
import { InstructorQuestion } from "../interfaces/instructorquestion.interface";
import { apiresponse } from "../interfaces/apiresponse.interface";

@Injectable({
  providedIn: "root",
})
export class QuestionsService {
  constructor(private http: HttpClient, private store: Store<RootState>) {}

  allQuestions() {
    this.http.get("/api/questions/all").subscribe((res: apiresponse) => {
      let data: InstructorQuestion[] = res.data;
      this.store.dispatch(
        Actions.setInstructorQuestions({ instructorQuestions: data })
      );
    });
  }

  byStudentId(id) {
    this.http
      .get("/api/questions/student/" + id)
      .subscribe((res: apiresponse) => {
        let data: InstructorQuestion[] = res.data;
        this.store.dispatch(
          Actions.setInstructorQuestions({ instructorQuestions: data })
        );
      });
  }

  byLessonId(id) {
    this.http
      .get("/api/questions/lesson/" + id)
      .subscribe((res: apiresponse) => {
        let data: InstructorQuestion[] = res.data;
        this.store.dispatch(
          Actions.setInstructorQuestions({ instructorQuestions: data })
        );
      });
  }

  byCohortId(id) {
    this.http
      .get("/api/questions/cohort/" + id)
      .subscribe((res: apiresponse) => {
        if (res.success) {
          let data: InstructorQuestion[] = res.data;
          this.store.dispatch(
            Actions.setInstructorQuestions({ instructorQuestions: data })
          );
        } else console.log("Couldn't get questions by cohort id");
      });
  }

  byTopic(topicId, cohortId) {
    this.http
      .post("/api/questions/topic", { topicid: topicId, cohortid: cohortId })
      .subscribe((res: apiresponse) => {
        let data: InstructorQuestion[] = res.data;
        this.store.dispatch(
          Actions.setInstructorQuestions({ instructorQuestions: data })
        );
      });
  }

  editQuestion(id, question, answer) {
    this.http
      .put("/api/questions/edit", {
        question_text: question,
        question_answer: answer,
        id: id,
      })
      .subscribe((res: apiresponse) => {
        if (res.success) {
          this.allQuestions();
        }
      });
  }

  questionQuestion(question: InstructorQuestion) {
    this.http
      .post("/api/questions/new", question)
      .subscribe((res: apiresponse) => {
        if (res.success) {
          this.allQuestions();
        }
      });
  }

  deleteQuestion(id) {
    this.http
      .delete("/api/questions/delete/" + id)
      .subscribe((res: apiresponse) => {
        if (res.success) {
          this.allQuestions();
        }
      });
  }
}
