import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from 'src/app/store/selectors'
import * as qclone from 'qclone'
import { Enrollment } from 'src/app/interfaces/enrollment.interface';
import { Cohort } from 'src/app/interfaces/cohort.interface';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent implements OnInit {
  roster$: Observable<Array<Enrollment>>;
  roster: Array<Enrollment>;
  cohortList$: Observable<Array<Cohort>>;
  cohortList: Array<Cohort>;


  constructor(
    private store: Store<RootState>,
  ) {
    this.roster$ = this.store.pipe(select(Selectors.getCohortRosters))
    this.cohortList$ = this.store.pipe(select(Selectors.getCohortList))
  }

  ngOnInit(): void {
    this.roster$.subscribe((res: Enrollment[]) => {
      console.log(res)
      this.roster = qclone.qclone(res)
    })
    this.cohortList$.subscribe(res => {
      console.log(res)
      this.cohortList = res
    })

  }

}
