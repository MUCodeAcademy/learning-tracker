import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import * as Selectors  from '../store/selectors'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<any>
  user: User = {
    first_name: "",
    last_name: "",
    role_id: "4",
    id: "",
    email_address: ""
  }
  constructor(
    private store: Store<RootState>
  ) {
    this.user$ = this.store.select(Selectors.getUserInfo)
   }

  ngOnInit(): void {
    this.user$.subscribe((res: User) => {
      this.user = res
    })

    console.log(this.user);
    
  }

}
