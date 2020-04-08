import { Component, OnInit } from '@angular/core';
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cohort } from '../interfaces/Cohort.interface';
import * as Selectors from '../store/selectors'
import * as qclone from 'qclone'
import { CohortService } from '../services/cohort.service';

@Component({
  selector: 'app-lesson-display',
  templateUrl: './lesson-display.component.html',
  styleUrls: ['./lesson-display.component.scss']
})
export class LessonDisplayComponent implements OnInit {
  cohortList$: Observable<any>
  cohortList: Array<Cohort>

  constructor(private store: Store<RootState>, private cohortService: CohortService) {
    console.log('TODDTESTING1');
    //this.cohortService.getAllCohorts();   // THIS ON IS CAUSING THE ERROR
    console.log('TODDTESTING2');
    this.cohortList$ = this.store.select(Selectors.getCohortList);
    console.log('TODDTESTING3');
   }

  ngOnInit(): void {
    console.log('TODDTESTING4');
    // this.cohortList$.subscribe((res: Cohort[]) => {
    //   this.cohortList = qclone.qclone(res)
    // })
    console.log('TODDTESTING');
  }

}
