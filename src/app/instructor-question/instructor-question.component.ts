import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { InstructorQuestion } from "../interfaces/instructorquestion.interface";
import { Store } from "@ngrx/store";
import { RootState } from "../store/";
import { QuestionsService } from "../services/questions.service";
import * as Selectors from "../store/selectors";
import * as qclone from "qclone";
import { Cohort } from '../interfaces/cohort.interface';

@Component({
  selector: "app-instructor-question",
  templateUrl: "./instructor-question.component.html",
  styleUrls: ["./instructor-question.component.scss"],
})
export class InstructorQuestionComponent implements OnInit {
  userid$: Observable<string>;
  userid;
  userrole$: Observable<string>;
  userrole: string;
  instructorQuestion$: Observable<InstructorQuestion[]>;
  instructorQuestion: InstructorQuestion[];
  viewedlesson$: Observable<string>;
  viewedlesson: string;
  instructor$: Observable<Array<Cohort>>
  instructor: Array<Cohort>

  newinstructorQuestion: InstructorQuestion = {
    id: "",
    student_id: "",
    instructor_id: "",
    lesson_id: "",
    question_text: "",
    question_answer: "",
  };

  questionTemplate: InstructorQuestion = {
    id: "",
    student_id: "",
    instructor_id: "",
    lesson_id: "",
    question_text: "",
    question_answer: "",
  };

  constructor(
    private store: Store<RootState>,
    private questions: QuestionsService
  ) {
    this.instructorQuestion$ = this.store.select(
      Selectors.getInstructorQuestions
    );
    this.userid$ = this.store.select(Selectors.getUserId);
    this.userrole$ = this.store.select(Selectors.getUserRole);
    this.viewedlesson$ = this.store.select(Selectors.getViewedLesson)
    this.instructor$ = this.store.select(Selectors.getCohortList)
  }

  saveQuestion(question: InstructorQuestion) {
    if (question.id === "") {
      // this is a new question and we must configure it
      question.student_id = this.userid;
      question.lesson_id = this.viewedlesson;
      question.instructor_id = this.instructor;
      this.questions.questionQuestion(question);
      this.newinstructorQuestion = { ...this.questionTemplate };
    }
  }

  ngOnInit(): void {
    this.instructorQuestion$.subscribe((res) => {
      let data = qclone.qclone(res);
      this.instructorQuestion = data;
    });
    this.userid$.subscribe((res) => (this.userid = res));
    this.userrole$.subscribe((res) => (this.userrole = res));
    this.viewedlesson$.subscribe(res => {this.viewedlesson = res})
    this.instructor$.subscribe(res => {this.instructor = res})
  }
}
