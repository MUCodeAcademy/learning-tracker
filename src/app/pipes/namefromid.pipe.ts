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

  constructor(private store: Store<RootState>) {
  }

  transform(id: string | number): string {
    let userlist$ = this.store.select(Selectors.getUserList)
    let userlist
    userlist$.subscribe(res => userlist = res)
    let uid = `${id}`
    let user: User = userlist.filter((obj: User) => {return obj.id === uid})
    let name = `${user.first_name} ${user.last_name}`
    return name;
  }

}
