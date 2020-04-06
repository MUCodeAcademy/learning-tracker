import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User.interface'
import { Auth0User } from '../interfaces/Auth0User.interface';
import { APIResponse } from '../interfaces/APIResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>;

  constructor(private store: Store<RootState>, private auth: AuthService, private http: HttpClient) { }


  // this function controls all data acquisition when the app initially loads.
  // be very careful changing this function
  setUserData() {
    this.user$ = this.auth.getUser$()
    this.user$.subscribe((auth: Auth0User) => {
      let authfirst: string = auth.given_name
      let authlast: string = auth.family_name
      this.store.dispatch(Actions.setUserEmail({ email: auth["email"] }))
      this.http.post('/api/users/userinfo', auth).subscribe((response: APIResponse) => {
        let data: User = response.data
        data.email = data["email_address"]
        data.role = data["role_id"]
        console.log(data)
        this.store.dispatch(Actions.setUserInfo({ user: data }))
        if (data.first_name != authfirst || data.last_name != authlast) {
          let fixed:User = {...data, first_name: auth.given_name, last_name: auth.family_name}
          this.http.put('/api/users/edit', fixed).subscribe(res => {
            console.log("DB updated w/ new google data.")
          })
        }
      })
    });
  }

  getAllUsers() {
    this.http.get('/api/users/all').subscribe((res: APIResponse) =>{
      let data: User[] = res.data
      this.store.dispatch(Actions.setUserList({userlist: data}))
      })
  }

  activateUser(studentid: string, cohortid: string){
    let activate = {
      userid: studentid,
      cohortid: cohortid
    }
    this.http.post('api/users/activate', activate).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllUsers()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  }

  updateUserRole(user: User) {
    this.http.post('/api/users/edit', user).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllUsers()
      }
      else console.log("Error updating user, feedback to UI here.")
    })
  }

}
