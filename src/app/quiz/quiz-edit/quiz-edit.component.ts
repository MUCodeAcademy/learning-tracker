import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../interfaces/quiz.interface';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors';
import { Cohort } from '../../interfaces/cohort.interface';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  quizList$: Observable<any>
  quizList: Array<Quiz>
  viewedQuizid$: Observable<any>
  viewedQuizid: string
  viewedQuiz:Quiz
  quizForm: FormGroup
  cohortList$: Observable<Cohort[]>;


  constructor(private store: Store<RootState>,public dialogRef: MatDialogRef<QuizEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private fb: FormBuilder, 
    private quizService: QuizService) { 
      this.quizList$ = this.store.select(Selectors.getQuiz);
      this.viewedQuizid$ = this.store.select(Selectors.getViewedQuiz);
      this.cohortList$ = this.store.select(Selectors.getCohortList)
    }

  ngOnInit(): void {
    this.quizList$.subscribe(val => this.quizList = val);
    this.quizForm = this.fb.group({
      quizName: ["", Validators.required],
      quizWeek: ["", Validators.required],
      cohort: ["", Validators.required],
      questions: this.fb.array([])
    })
    if(this.data.id){
      
      let quiz: Quiz = this.quizList.filter(v=> v._id === this.data.id)[0]
      // quiz.questions = quiz.questions.map()
      this.quizForm.patchValue({
        cohort: quiz.cohort.toString(),
        quizWeek: quiz.quizWeek,
        quizName: quiz.quizName
      })
      quiz.questions.forEach(q=> this.addQuestion(q));
    }
  }

  newQuestion(): FormGroup{
    return this.fb.group({
      Q: ['', Validators.required],
      A: ['', Validators.required],
      code: [''],
      Choices: ['']
    })
  }
  addQuestion(question = null){
    let q 
    if(question){
      q = this.fb.group({
        Q: question.Q,
        A: question.A,
        code: question.code,
        Choices: question.Choices.join(",")
      })
    }
    (this.quizForm.get("questions") as FormArray).push(question ? q : this.newQuestion())
  }



  removeQuestion(i){
    (this.quizForm.get("questions") as FormArray).removeAt(i)
  }
  close(){
    this.dialogRef.close();
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }
  
  upsertQuiz(){
    if(this.quizForm.valid){
    let quiz = {
      cohort: this.quizForm.value.cohort,
      quizName: this.quizForm.value.quizName,
      quizWeek: this.quizForm.value.quizWeek,
    };
    let questions = this.quizForm.value.questions as Array<Object>;
    console.log(questions);
    questions = questions.map(q=>{
      if(q['Choices'].length > 0){
        q['Choices'] = q['Choices'].split(",")
      }
      return q
    });
    Object.assign(quiz, {questions: questions})

    if(this.data.id){
      quiz = Object.assign(quiz, {_id: this.data.id});
      this.quizService.editQuiz(quiz, this.dialogRef);
    }
    else{
      this.quizService.createQuiz(quiz, this.dialogRef);
    }
  }
  else{
    this.quizForm.markAllAsTouched();
  }
}

}
