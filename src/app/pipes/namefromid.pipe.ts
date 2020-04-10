import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import * as Selectors from '../store/selectors'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Pipe({
  name: 'namefromid'
})
export class NamefromidPipe implements PipeTransform {
  userlist$
  userlist

  constructor(private store: Store<RootState>) {
    this.userlist$ = this.store.select(Selectors.getUserList)
    this.userlist$.subscribe(res => this.userlist = res)
  }

  transform(id: string | number): string {
    let uid = `${id}`
    let user: User = this.userlist.filter((obj: User) => {return obj.id === uid})[0]
    let name
    if (user) {
           name = `${user.first_name} ${user.last_name}`
    }
    else name = ""
    return name;
  }

}
