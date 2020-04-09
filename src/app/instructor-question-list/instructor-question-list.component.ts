import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { InstructorQuestion } from "../interfaces/instructorquestion.interface";
import { Store } from "@ngrx/store";
import { RootState } from "../store/";
import { QuestionsService } from "../services/questions.service";
import * as Selectors from "../store/selectors";
import * as qclone from "qclone";
import { User } from "../interfaces/user.interface";

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

  constructor() {}

  ngOnInit(): void {}
}
