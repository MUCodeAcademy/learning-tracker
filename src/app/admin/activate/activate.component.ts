import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { UserService } from 'src/app/services/user.service';
import * as Selectors from 'src/app/store/selectors'
import * as qclone from 'qclone'
import { CohortService } from 'src/app/services/cohort.service';
import { Cohort } from 'src/app/interfaces/Cohort.interface';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  userlist$: Observable<Array<User>>;
  userlist: Array<User>;
  user$: Observable<any>;
  user: User = {
    first_name: "",
    last_name: "",
    role_id: "4",
    id: "",
    email_address: "",
    newCohort_id: ""
  };
  cohortList$: Observable<Array<Cohort>>;
  cohortList: Array<Cohort>;

  constructor(
    private store: Store<RootState>,
    private userService: UserService,
  ) {
    this.userlist$ = this.store.pipe(select(Selectors.getUserList))
    this.user$ = this.store.pipe(select(Selectors.getUserInfo))
    this.cohortList$ = this.store.pipe(select(Selectors.getCohortList))
   }

  update(person){
    let studentid = this.userlist[person].id;
    let cohortid = this.userlist[person].newCohort_id;
    console.log(studentid, cohortid);
    
    this.userService.activateUser(studentid, cohortid)
  }
   

  ngOnInit(): void {


    this.user$.subscribe((res: User) => {
      this.user = qclone.qclone(res)
    })

    this.userlist$.subscribe((res: User[]) => {
      let data = qclone.qclone(res)
      data.forEach((res: User) => {
        res.newCohort_id = ""
      });
      this.userlist = data      
    })

    this.cohortList$.subscribe(res => {
      this.cohortList = qclone.qclone(res)
    })
  }

}
