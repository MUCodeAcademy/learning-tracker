import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import * as Selectors from '../store/selectors'

@Injectable({
  providedIn: 'root'
})
export class InstructorGuard implements CanActivate {
userrole$: Observable<string>
userrole: string

  constructor(private store: Store<RootState>) {this.userrole$ = this.store.select(Selectors.getUserRole)
    this.userrole$.subscribe(res=> this.userrole = res)}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userrole === "2" || this.userrole === "1";
  }
  
}
