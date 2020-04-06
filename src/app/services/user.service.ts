import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User.interface'
import { Auth0User } from '../interfaces/Auth0User.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>;

  constructor(private store: Store<RootState>, private auth: AuthService, private http: HttpClient) { }

  setUserData() {
    this.user$ = this.auth.getUser$()
    this.user$.subscribe((auth: Auth0User) => {
      console.log("AUTH0:", auth);
      let authfirst: string = auth.given_name
      let authlast: string = auth.family_name
      this.store.dispatch(Actions.setUserEmail({ email: auth["email"] }))
      this.http.post('/api/users/userinfo', auth).subscribe((data: User) => {
        this.store.dispatch(Actions.setUserInfo({ user: data }))
        if (data.first != authfirst || data.last != authlast) {
          this.http.put('/api/users/edit', auth).subscribe(res => {
            console.log("DB updated w/ new google data.")
          })
        }
      })
    });
  }
}
