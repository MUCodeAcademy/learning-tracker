import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as Selectors from 'src/app/store/selectors'
import * as qclone from 'qclone'

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
    email_address: ""
  };
  cohortList$: Observable<Array<Object>>;
  cohortList: Array<Object>;

  constructor(
    private store: Store<RootState>,
    private userService: UserService,
    private router: Router,
    private actr: ActivatedRoute
  ) {
    this.userlist$ = store.pipe(select(Selectors.getUserList))
    this.user$ = this.store.select(Selectors.getUserInfo)
    // this.cohortList$ = this.store.select(Selectors.getCohort)
   }

  
 // [(ngModel)]="user[i].newCohort_id"

  ngOnInit(): void {
    this.userService.getAllUsers()

    this.user$.subscribe((res: User) => {
      this.user = qclone.qclone(res)
      console.log(res, this.user)
    })

    this.userlist$.subscribe(res => {
      this.userlist = qclone.qclone(res)
    })

    // this.cohortList$.subscribe(res => {
    //   this.cohortList = qclone.qclone(res)
    // })
  }

}
