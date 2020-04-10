import { Component, OnInit } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { InstructorQuestion } from "../../interfaces/instructorquestion.interface";
import { Store } from "@ngrx/store";
import { RootState } from "../../store";
import { QuestionsService } from "../../services/questions.service";
import * as Selectors from "../../store/selectors";
import * as qclone from "qclone";
import { Cohort } from '../../interfaces/cohort.interface';
import { map } from 'rxjs/operators';


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
    instructor_id: "0",
    lesson_id: "",
    question_text: "",
    question_answer: "",
  };

  questionTemplate: InstructorQuestion = {
    id: "",
    student_id: "",
    instructor_id: "0",
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
      question.student_id = this.userid;
      question.lesson_id = this.viewedlesson;
      console.log(question);
      
      this.questions.questionQuestion(question);
      this.newinstructorQuestion = { ...this.questionTemplate };
  }

  editQuestion(question: InstructorQuestion){
    console.log(question)
    this.questions.editQuestion(question)
    console.log(this.instructorQuestion);
    
  }

  ngOnInit(): void {
    combineLatest([this.instructorQuestion$, this.viewedlesson$]).pipe(map(([question, lesson]) => ({question, lesson}))).subscribe(res=> {
      if (res.question.length > 0 && res.lesson != "") {
      let list: InstructorQuestion[] = res.question
      let viewed: string = res.lesson
      let filtered = list.filter((obj: InstructorQuestion) => {return obj.lesson_id == viewed})
      let cloned = qclone.qclone(filtered)
      this.instructorQuestion = cloned
      this.viewedlesson = viewed
    }}) 
    this.userid$.subscribe((res) => (this.userid = res));
    this.userrole$.subscribe((res) => (this.userrole = res));
    this.instructor$.subscribe(res => {this.instructor = res})
  }
}
