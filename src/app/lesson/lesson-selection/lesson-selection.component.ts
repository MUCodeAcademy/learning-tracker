import { Component, OnInit } from '@angular/core';
import { RootState } from '../../store';
import { Store } from '@ngrx/store';
import { Observable, fromEvent, of, combineLatest, from } from 'rxjs';
import { Cohort } from '../../interfaces/Cohort.interface';
import * as Selectors from '../../store/selectors'
import * as Actions from '../../store/actions'
import { CohortService } from '../../services/cohort.service';
import { Lesson } from '../../interfaces/lesson.interface';
import { LessonService } from '../../services/lesson.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-lesson-selection',
  templateUrl: './lesson-selection.component.html',
  styleUrls: ['./lesson-selection.component.scss']
})
export class LessonSelectionComponent implements OnInit {
  cohortList$: Observable<any>
  cohortList: Array<Cohort>
  lessonList$: Observable<any>
  lessonList: Array<Lesson>
  lessonMenu: Array<Lesson>
  user$: Observable<User>
  user: User
  lessonmenu: FormGroup
  cohortmenu: FormGroup
  selectedlesson$
  selectedcohort$
  studentcohort$:Observable<any>
  studentcohort: Array<Cohort>
  

  constructor(private store: Store<RootState>, private form: FormBuilder) {
    this.cohortList$ = this.store.select(Selectors.getCohortList);
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.user$ = this.store.select(Selectors.getUserInfo);
    this.cohortmenu = this.form.group({selectedcohort: ""})
    this.lessonmenu = this.form.group({selectedlesson: ""})
    this.selectedcohort$ = this.cohortmenu.valueChanges
    this.selectedlesson$ = this.lessonmenu.valueChanges
    this.studentcohort$ = this.store.select(Selectors.getUserEnrollment);
   }

  ngOnInit(): void {
    this.cohortList$.subscribe((res: Cohort[]) => {
      this.cohortList = res
      console.log(res)
    })
    this.lessonList$.subscribe(res => this.lessonList = res)
    this.user$.subscribe(res => {this.user = res;
      if (res.role_id === "3"){
        this.studentcohort$.subscribe(res => {
         this.selectedcohort$ = from([res]) 
        })
      }})
    this.selectedlesson$.subscribe(res => this.store.dispatch(Actions.setViewedLesson({lessonid: res.selectedlesson})))
    this.selectedcohort$.subscribe(res => {
      if (this.user.role_id === "2" || this.user.role_id === "3"){
      let seenlessons = this.lessonList.filter(obj => {return obj.cohort_id === res})
      this.lessonMenu = seenlessons
    }})

    
  }

}
