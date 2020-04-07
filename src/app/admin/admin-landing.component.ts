import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from '../store';
import { UserService } from '../services/user.service';
import * as Actions from '../store/actions'
import * as Selectors from '../store/selectors'

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent implements OnInit {
userlist$: Observable<Object>;

  constructor(
    private store: Store<RootState>,
    private userService: UserService
  ) { 
    this.userlist$ = store.pipe(select(Selectors.getUserList))
  }



  ngOnInit(): void {
    this.userService.getAllUsers()

  }

}
