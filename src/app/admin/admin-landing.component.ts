import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from '../store';
import { UserService } from '../services/user.service';
import * as Selectors from '../store/selectors'
import * as qclone from 'qclone'
import { User } from 'src/app/interfaces/user.interface';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent implements OnInit {
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
  menuChoice: string = 'activate'
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

 
  save(person){
    this.userService.activateUser(person.id, person.newCohort_id)
  }

  navigate(value: string){
    this.router.navigate([value], {relativeTo: this.actr})
  }


 

  ngOnInit(): void {

    this.user$.subscribe((res: User) => {
      this.user = qclone.qclone(res)
    })

    this.userlist$.subscribe(res => {
      this.userlist = qclone.qclone(res)
    })

    // this.cohortList$.subscribe(res => {
    //   this.cohortList = qclone.qclone(res)
    // })

  }

}
