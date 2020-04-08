import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { UserService } from 'src/app/services/user.service';
import * as Selectors from 'src/app/store/selectors'
import * as qclone from 'qclone'
import { CohortService } from 'src/app/services/cohort.service';


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  userlist$: Observable<Array<Object>>;
  userlist: Array<Object>;
  user$: Observable<any>;
  user: User = {
    first_name: "",
    last_name: "",
    role_id: "4",
    id: "",
    email_address: "",
    newCohort_id: ""
  };
  cohortList$: Observable<Array<Object>>;
  cohortList: Array<Object>;

  constructor(
    private store: Store<RootState>,
    private userService: UserService,
    private cohortService: CohortService
  ) {
    this.userlist$ = store.pipe(select(Selectors.getUserList))
    this.user$ = this.store.select(Selectors.getUserInfo)
    this.cohortList$ = this.store.select(Selectors.getCohortList)
   }

  update(person){
    let studentid = person.id;
    let cohortid = person.newCohort_id;
    this.userService.activateUser(studentid, cohortid)
  }
   

  ngOnInit(): void {
    this.userService.getAllUsers()
    this.cohortService.getAllCohorts()


    this.user$.subscribe((res: User) => {
      this.user = qclone.qclone(res)
      console.log(res, this.user)
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
