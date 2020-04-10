import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../store/selectors';
import { map } from 'rxjs/operators';
import { Quiz } from 'src/app/interfaces/quiz.interface';
import { MatDialog } from '@angular/material/dialog';
import { QuizEditComponent } from '../quiz-edit/quiz-edit.component';

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.scss']
})
export class QuizDisplayComponent implements OnInit {
  quizList$: Observable<any>
  quizList: Array<Quiz>
  viewedQuiz$: Observable<any>
  viewedQuiz: string
  viewedQuizTarget: Quiz

  constructor(private store: Store<RootState>, public dialog: MatDialog) {
    this.quizList$ = this.store.select(Selectors.getQuiz);
    this.viewedQuiz$ = this.store.select(Selectors.getViewedQuiz);
  }

  ngOnInit(): void {
    combineLatest([this.quizList$, this.viewedQuiz$]).pipe(
      map(([list, viewedId]) => ({list, viewedId}))
  )
  .subscribe(pair => {
      console.log(pair)
      this.quizList = pair.list as Quiz[]
      this.viewedQuiz = pair.viewedId;
      let target = this.quizList.find(obj => { return obj._id === pair.viewedId })
      this.viewedQuizTarget = target
  })
  }
  edit(){
    let dialog = this.dialog.open(QuizEditComponent, {
      data: {id: this.viewedQuiz}
    })
  }
}
