import { Component, OnInit } from '@angular/core';
import { RootState } from '../../store';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { Cohort } from '../../interfaces/cohort.interface';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { map } from 'rxjs/operators';
import { Quiz } from '../../interfaces/quiz.interface';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent implements OnInit {
  cohortList$: Observable<any>
  cohortList: Array<Cohort>
  quizList$: Observable<any>
  quizList: Array<Quiz>
  quizMenu: Array<Quiz>
  user$: Observable<User>
  user: User
  quizmenu: FormGroup
  cohortmenu: FormGroup
  studentcohort$: Observable<any>
  studentcohort: Array<Cohort>
  selectedquiz$
  selectedcohort$

  constructor(private store: Store<RootState>, private form: FormBuilder) {
    this.cohortList$ = this.store.select(Selectors.getCohortList);
    this.quizList$ = this.store.select(Selectors.getQuiz);
    this.user$ = this.store.select(Selectors.getUserInfo);
    this.cohortmenu = this.form.group({ selectedcohort: "" })
    this.quizmenu = this.form.group({ selectedquiz: "" })
    this.selectedcohort$ = this.cohortmenu.valueChanges
    this.selectedquiz$ = this.quizmenu.valueChanges
    this.studentcohort$ = this.store.select(Selectors.getUserEnrollment);
  }

  ngOnInit(): void {
    this.selectedquiz$.subscribe(res => this.store.dispatch(Actions.setViewedQuiz({ viewedquiz: res.selectedquiz })))
    combineLatest([this.selectedcohort$, this.quizList$]).pipe(map(([cohort, list]) => ({ cohort, list }))).subscribe(res => {
      if (res.list.length > 0 && this.user.role_id === "2" || this.user.role_id === "3" || this.user.role_id === "1") {
        let seenquiz = res.list.filter(obj => { return obj.cohort == res.cohort['selectedcohort'] })
        this.quizMenu = seenquiz
      }
    })
    combineLatest([this.user$, this.cohortList$, this.studentcohort$]).pipe(map(([user, list, cohort]) => ({ user, list, cohort }))).subscribe(res => {
      this.user = res.user
      this.studentcohort = res.cohort
      if (res.user.role_id != "" && res.list.length > 0) {
        let filteredcohort: Cohort[] = []
        if (res.user.role_id === "3" && res.cohort.cohort_id) {
          filteredcohort = res.list.filter((cohort: Cohort) => { return cohort.id == res.cohort.cohort_id })
          this.cohortmenu.patchValue({ selectedcohort: res.cohort.cohort_id })
        }
        else if (res.user.role_id === "2") {
          filteredcohort = res.list.filter((cohort: Cohort) => { return cohort.instructor_id == res.user.id })
          this.cohortmenu.patchValue({ selectedcohort: filteredcohort[0].id })
        }
        if (filteredcohort && filteredcohort.length > 0) {
          this.cohortList = filteredcohort
        }
        else this.cohortList = res.list
      }
    })
    this.selectedquiz$.subscribe(res => this.store.dispatch(Actions.setViewedQuiz({ viewedquiz: res.selectedquiz })))



  }

}
