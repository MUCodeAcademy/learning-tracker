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
  userrole$: Observable<string>
  userrole: string
  selectedlesson: string
  selectedcohort: string = ""
  selectedcohort$: Observable<string> 

  constructor(private store: Store<RootState>, private cohortService: CohortService, private lessonService: LessonService) {
    this.cohortList$ = this.store.select(Selectors.getCohortList);
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.userrole$ = this.store.select(Selectors.getUserRole);
    this.selectedcohort$ = of(this.selectedcohort)
   }

  ngOnInit(): void {
    this.cohortList$.subscribe((res: Cohort[]) => {
      this.cohortList = res
      console.log(res)
    })
    this.lessonList$.subscribe((res: Lesson[]) => {
      this.lessonList = res
    })
    this.userrole$.subscribe(res => this.userrole = res)
    this.selectedcohort$.subscribe(res => console.log("from sub", res))
  }

  lessonChoice(id: string) {
    this.store.dispatch(Actions.setViewedLesson({lessonid: id}))
  }

  cohortChoice(id: string){
    this.selectedcohort = id
    console.log("I changed it", id, this.selectedcohort)
  }

}
