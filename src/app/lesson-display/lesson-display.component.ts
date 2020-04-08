import { Component, OnInit } from '@angular/core';
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cohort } from '../interfaces/Cohort.interface';
import * as Selectors from '../store/selectors'
import * as qclone from 'qclone'

@Component({
  selector: 'app-lesson-display',
  templateUrl: './lesson-display.component.html',
  styleUrls: ['./lesson-display.component.scss']
})
export class LessonDisplayComponent implements OnInit {
  cohortList$: Observable<any>
  cohortList: Array<Cohort>

  constructor(private store: Store<RootState>) {
    this.cohortList$ = this.store.select(Selectors.getCohort);
   }

  ngOnInit(): void {
    this.cohortList$.subscribe((res: Cohort) => {
      this.cohortList = qclone.qclone(res)
    })
  }

}
