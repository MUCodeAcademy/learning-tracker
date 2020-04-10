import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from 'src/app/store/selectors'
import * as qclone from 'qclone'
import { User } from 'src/app/interfaces/user.interface';
import { CohortService } from 'src/app/services/cohort.service';
import { Enrollment } from 'src/app/interfaces/enrollment.interface';
import { Cohort } from 'src/app/interfaces/Cohort.interface';

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
  cohortTemplate: Cohort = {
    id: "",
    cohort_name: "",
    instructor_id: ""
  }

  newCohort: Cohort = {
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
    console.log(cohort);
    
    this.CohortService.updateCohort(cohort)
  }

  changeCohort(person){
    console.log(person);
    
    this.CohortService.changeStudentsCohort(person)
  }

  createCohort(nextCohort: Cohort){
    console.log(nextCohort);
    
    this.CohortService.createCohort(nextCohort)
    this.newCohort = {...this.cohortTemplate}
  }

  ngOnInit(): void {
    this.roster$.subscribe((res: Enrollment[]) => {
      this.roster = qclone.qclone(res)      
    })
    this.cohortList$.subscribe(res => {
      this.cohortList = qclone.qclone(res)
    })
    this.instructors$.subscribe(res => {
      this.instructors = qclone.qclone(res)
      })

  }

}
