import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import { RootState } from '../store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>;

  constructor(private store: Store<RootState>, private auth: AuthService) { }

    setUserData(){
      this.user$ = this.auth.getUser$()
      this.user$.subscribe(res=>{
        console.log(res);
        this.store.dispatch(Actions.setUser({userEmail: res["email"], userRole: "Unused"}))});
    }
}
