import { Component, OnInit } from '@angular/core';
import { RootState } from '../../store';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { Cohort } from '../../interfaces/Cohort.interface';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';
import { Lesson } from '../../interfaces/lesson.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { map } from 'rxjs/operators';

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
  studentcohort$: Observable<any>
  studentcohort: Array<Cohort>
  selectedlesson$
  selectedcohort$

  constructor(private store: Store<RootState>, private form: FormBuilder) {
    this.cohortList$ = this.store.select(Selectors.getCohortList);
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.user$ = this.store.select(Selectors.getUserInfo);
    this.cohortmenu = this.form.group({ selectedcohort: "" })
    this.lessonmenu = this.form.group({ selectedlesson: "" })
    this.selectedcohort$ = this.cohortmenu.valueChanges
    this.selectedlesson$ = this.lessonmenu.valueChanges
    this.studentcohort$ = this.store.select(Selectors.getUserEnrollment);
  }

  ngOnInit(): void {
    combineLatest([this.user$, this.cohortList$, this.studentcohort$]).pipe(map(([user, list, cohort]) => ({ user, list, cohort }))).subscribe(res => {
      this.user = res.user
      this.studentcohort = res.cohort
      if (res.user.role_id != "" && res.list.length > 0) {
        let filteredcohort: Cohort[] = []
        if (res.user.role_id === "3" && res.cohort.cohort_id) {
          filteredcohort = res.list.filter((cohort: Cohort) => {return cohort.id == res.cohort.cohort_id})
          this.cohortmenu.patchValue({ selectedcohort: res.cohort.cohort_id })
        }
        else if (res.user.role_id === "2") {
          filteredcohort = res.list.filter((cohort: Cohort) => {return cohort.instructor_id == res.user.id})
          this.cohortmenu.patchValue({ selectedcohort: filteredcohort[0].id })
        }
        console.log(filteredcohort, "filtered after all the ifs")
        if (filteredcohort && filteredcohort.length > 0) {
          this.cohortList = filteredcohort
        }
        else this.cohortList = res.list
      }
    })
    this.selectedlesson$.subscribe(res => this.store.dispatch(Actions.setViewedLesson({ lessonid: res.selectedlesson })))
    combineLatest([this.selectedcohort$, this.lessonList$]).pipe(map(([cohort, list]) => ({ cohort, list }))).subscribe(res => {
      if (res.list.length > 0 && this.user.role_id === "2" || this.user.role_id === "3") {
        let seenlessons = res.list.filter(obj => { return obj.cohort_id == res.cohort['selectedcohort'] })
        this.lessonMenu = seenlessons
      }
    })


  }

}
