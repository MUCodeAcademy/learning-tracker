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
  userrole$: Observable<string>
  userrole: string
  lessonmenu: FormGroup
  cohortmenu: FormGroup
  selectedlesson$
  selectedcohort$
  

  constructor(private store: Store<RootState>, private form: FormBuilder) {
    this.cohortList$ = this.store.select(Selectors.getCohortList);
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.userrole$ = this.store.select(Selectors.getUserRole);
    this.cohortmenu = this.form.group({selectedcohort: ""})
    this.lessonmenu = this.form.group({selectedlesson: ""})
    this.selectedcohort$ = this.cohortmenu.valueChanges
    this.selectedlesson$ = this.lessonmenu.valueChanges
   }

  ngOnInit(): void {
    this.cohortList$.subscribe((res: Cohort[]) => {
      this.cohortList = res
      console.log(res)
    })
    this.lessonList$.subscribe(res => this.lessonList = res)
    this.userrole$.subscribe(res => this.userrole = res)
    this.selectedlesson$.subscribe(res => this.store.dispatch(Actions.setViewedLesson({lessonid: res.selectedlesson})))
    this.selectedcohort$.subscribe(res => {
      let seenlessons = this.lessonList.filter(obj => {return obj.cohort_id === res})
      this.lessonMenu = seenlessons
    })
  }

}
