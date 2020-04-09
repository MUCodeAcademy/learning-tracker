import { Component, OnInit } from '@angular/core';
import { RootState } from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cohort } from '../../interfaces/cohort.interface';
import * as Selectors from '../../store/selectors'
import * as qclone from 'qclone'
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

  constructor(private store: Store<RootState>, private cohortService: CohortService, private lessonService: LessonService) {
    this.cohortService.getAllCohorts();   // THIS WILL BE REMOVED LATER
    this.lessonService.getAllLessons();   // THIS WILL BE REMOVED LATER
    this.cohortList$ = this.store.select(Selectors.getCohortList);
    this.lessonList$ = this.store.select(Selectors.getLessons);
   }

  ngOnInit(): void {
    this.cohortList$.subscribe((res: Cohort[]) => {
      this.cohortList = qclone.qclone(res)
    })
    this.lessonList$.subscribe((res: Lesson[]) => {
      this.lessonList = qclone.qclone(res)
    })
  }

}
