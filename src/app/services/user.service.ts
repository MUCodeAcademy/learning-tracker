import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as Actions from '../store/actions'
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface'
import { Auth0User } from '../interfaces/auth0user.interface';
import { APIResponse } from '../interfaces/apiresponse.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>;

  constructor(private store: Store<RootState>, private auth: AuthService, private http: HttpClient, private snackbar: MatSnackBar) { }


  // this function controls all data acquisition when the app initially loads.
  // be very careful changing this function
  setUserData() {
    this.user$ = this.auth.getUser$()
    this.user$.subscribe((auth: Auth0User) => {
      let authfirst: string = auth.given_name
      let authlast: string = auth.family_name
      let authuser = {
        email_address: auth.email
      }
      this.store.dispatch(Actions.setUserInfo({ user: authuser }))
      this.http.post('/api/users/userinfo', authuser).subscribe((response: APIResponse) => {
        if (response.success) {
        let data: User = response.data
        this.store.dispatch(Actions.setUserInfo({ user: data }))
        if (data.first_name != authfirst || data.last_name != authlast) {
          let fixed: User = { ...data, first_name: auth.given_name, last_name: auth.family_name }
          this.http.put('/api/users/edit', fixed).subscribe(res => {
            this.snackbar.open("Profile updated to match your Google profile.", "OK")
          })
        }
      }
      else this.snackbar.open("Your profile could not be retrieved from the database.", "Close", {duration: 3000})
    })
    });
  }

  getAllUsers() {
    this.http.get('/api/users/all').subscribe((res: APIResponse) => {
      if (res.success) {
      let data: User[] = res.data
      this.store.dispatch(Actions.setUserList({ userlist: data }))
      }
      else this.snackbar.open("The database could not retrieve user data.", "Close", {duration: 3000})
    })
  }

  activateUser(studentid: string, cohortid: string) {
    let activate = {
      userid: studentid,
      cohortid: cohortid
    }
    this.http.post('api/users/activate', activate).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllUsers()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  }

  updateUserRole(user: User) {
    this.http.put('/api/users/edit', user).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllUsers()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  }

}
