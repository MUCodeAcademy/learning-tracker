import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>;

  constructor(
    private auth: AuthService
    ) { }

    setUserData(){
      this.user$ = this.auth.getUser$()
      this.user$.subscribe(res=>console.log(res));
      
    }

}
