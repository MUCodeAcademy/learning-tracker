import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from 'src/app/store/selectors'
import * as qclone from 'qclone'
import { Enrollment } from 'src/app/interfaces/enrollment.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Cohort } from 'src/app/interfaces/cohort.interface';
import { CohortService } from 'src/app/services/cohort.service';

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
  instructors$: Observable<Array<User>>;
  instructors: Array<User>;
  cohort: Cohort = {
    id: "",
    cohort_name: "",
    instructor_id: ""
  }

  constructor(
    private store: Store<RootState>, private CohortService: CohortService
  ) {
    this.roster$ = this.store.pipe(select(Selectors.getCohortRosters))
    this.cohortList$ = this.store.pipe(select(Selectors.getCohortList))
    this.instructors$ = this.store.pipe(select(Selectors.getUserList))
  }

  update(cohort){
    this.CohortService.updateCohort(cohort)
  }

  changeCohort(person){
    this.CohortService.changeStudentsCohort(person)
  }

  ngOnInit(): void {
    this.roster$.subscribe((res: Enrollment[]) => {
      console.log(res)
      this.roster = qclone.qclone(res)
      console.log(this.roster);
      
    })
    this.cohortList$.subscribe(res => {
      this.cohortList = qclone.qclone(res)
      console.log(this.cohortList);
      
    })

    this.instructors$.subscribe(res => {
      this.instructors = qclone.qclone(res)
      })

  }

}
