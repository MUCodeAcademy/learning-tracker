import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { UserService } from 'src/app/services/user.service';
import * as Selectors from 'src/app/store/selectors'
import * as qclone from 'qclone'


@Component({
  selector: 'app-useradmin',
  templateUrl: './useradmin.component.html',
  styleUrls: ['./useradmin.component.scss']
})
export class UseradminComponent implements OnInit {
  userlist$: Observable<Array<Object>>;
  userlist: Array<Object>;
  user$: Observable<any>;
  user: User = {
    first_name: "",
    last_name: "",
    role_id: "4",
    id: "",
    email_address: ""
  }

  constructor(
    private store: Store<RootState>,
    private userService: UserService
  ) {
    this.userlist$ = store.pipe(select(Selectors.getUserList))
    this.user$ = this.store.select(Selectors.getUserInfo)
   }
  updateRole(person){
    this.userService.updateUserRole(person)
  }

  ngOnInit(): void {
    this.user$.subscribe((res: User) => {
      this.user = qclone.qclone(res)
    })

    this.userlist$.subscribe(res => {
      this.userlist = qclone.qclone(res)
    })
  }

}
