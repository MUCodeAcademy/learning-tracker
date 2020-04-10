import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';

@Component({
  selector: 'app-quiz-landing',
  templateUrl: './quiz-landing.component.html',
  styleUrls: ['./quiz-landing.component.scss']
})
export class QuizLandingComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
addQuiz(){
  const dialogRef = this.dialog.open(QuizEditComponent, {
    data: {
      
    }
  });
}

}
