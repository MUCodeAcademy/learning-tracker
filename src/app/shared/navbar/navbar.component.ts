import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RootState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/selectors'
import * as qclone from 'qclone'
import { User } from 'src/app/interfaces/User.interface';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<any>
  user: User = {
    first_name: "",
    last_name: "",
    role_id: "4",
    id: "",
    email: ""
  }

  constructor(public auth: AuthService, private store: Store<RootState>, private usersvc: UserService) {
    this.user$ = this.store.select(Selectors.getUserInfo)
   }

  logout(){
    this.auth.logout()
  }

  saveMe() {
    this.usersvc.updateUserRole(this.user)
  }

  ngOnInit(): void {
    this.user$.subscribe((res: User) => {
      this.user = qclone.qclone(res)
      console.log(res, this.user)
    })
  }

}
