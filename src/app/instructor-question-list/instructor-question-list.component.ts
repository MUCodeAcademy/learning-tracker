import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { InstructorQuestion } from "../interfaces/instructorquestion.interface";
import { Store } from "@ngrx/store";
import { RootState } from "../store/";
import { QuestionsService } from "../services/questions.service";
import * as Selectors from "../store/selectors";
import * as qclone from "qclone";

@Component({
  selector: "app-instructor-question-list",
  templateUrl: "./instructor-question-list.component.html",
  styleUrls: ["./instructor-question-list.component.scss"],
})
export class InstructorQuestionListComponent implements OnInit {
  userid$: Observable<string>;
  userid;
  instructorQuestion$: Observable<InstructorQuestion[]>;
  instructorQuestion: InstructorQuestion[];
  viewedlesson$: Observable<string>;
  viewedlesson: string;
  instructor$: Observable<string>;
  instructor: string;

  constructor(
    private store: Store<RootState>,
    private questions: QuestionsService
  ) {
    this.instructorQuestion$ = this.store.select(
      Selectors.getInstructorQuestions
    );
    this.userid$ = this.store.select(Selectors.getUserId);
  }

  ngOnInit(): void {
    this.instructorQuestion$.subscribe((res) => {
      let data = qclone.qclone(res);
      this.instructorQuestion = data;
    });
  }
}
