import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors'
import { InstructorQuestion } from '../interfaces/instructorquestion.interface';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs'
import { User } from '../interfaces/user.interface';
import { Cohort } from '../interfaces/Cohort.interface';
import { Enrollment } from '../interfaces/Enrollment.interface';
import { APIResponse } from '../interfaces/APIResponse.interface';

@Injectable({
  providedIn: "root",
})
export class QuestionsService {
  user$: Observable<User>
  user: User

  constructor(private http: HttpClient, private store: Store<RootState>) {
    this.user$ = this.store.select(Selectors.getUserInfo)
    this.user$.subscribe((res: User) => this.user = res)
  }

  getUserQuestionData(user?: User) {
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
      if (user.role_id === "1") {
        this.allQuestions()
      }
      else if (user.role_id === "2" && clist.length > 0) {
        let mycohorts = clist.filter((cohort: Cohort) => { return cohort.instructor_id == user.id })
        this.byCohortId(mycohorts[0].id)
      }
      else if (user.role_id === "3" && clist.length > 0 && enroll != {}) {
        this.byStudentId(enroll.cohort_id)
      }
    })
  }

  allQuestions() {
    this.http.get("/api/questions/all").subscribe((res: APIResponse) => {
      let data: InstructorQuestion[] = res.data;
      this.store.dispatch(
        Actions.setInstructorQuestions({ instructorQuestions: data })
      );
    });
  }

  byStudentId(id) {
    this.http
      .get("/api/questions/student/" + id)
      .subscribe((res: APIResponse) => {
        let data: InstructorQuestion[] = res.data;
        this.store.dispatch(
          Actions.setInstructorQuestions({ instructorQuestions: data })
        );
      });
  }

  byLessonId(id) {
    this.http
      .get("/api/questions/lesson/" + id)
      .subscribe((res: APIResponse) => {
        let data: InstructorQuestion[] = res.data;
        this.store.dispatch(
          Actions.setInstructorQuestions({ instructorQuestions: data })
        );
      });
  }

  byCohortId(id) {
    this.http
      .get("/api/questions/cohort/" + id)
      .subscribe((res: APIResponse) => {
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
      .subscribe((res: APIResponse) => {
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
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getUserQuestionData();
        }
      });
  }

  questionQuestion(question: InstructorQuestion) {
    this.http
      .post("/api/questions/new", question)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getUserQuestionData();
        }
      });
  }

  deleteQuestion(id) {
    this.http
      .delete("/api/questions/delete/" + id)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getUserQuestionData();
        }
      });
  }
}
