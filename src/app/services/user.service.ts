import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>;

  constructor(private store: Store<RootState>, private auth: AuthService, private http: HttpClient) { }

    setUserData(){
      this.user$ = this.auth.getUser$()
      this.user$.subscribe(auth=>{
        console.log("AUTH0:", auth);
        this.store.dispatch(Actions.setUserEmail({userEmail: auth["email"]}))
        this.http.post('/api/users/userinfo', auth).subscribe(data=>{console.log(data)
        })});
    }
}
