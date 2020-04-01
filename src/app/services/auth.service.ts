import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError, iif } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import * as Selectors from '../store/selectors'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0Client$: Observable<Auth0Client> = (from(createAuth0Client({
    domain: "midland-code.auth0.com",
    client_id: "Gl2tqzLj5G9sZX2O1vLXp7EyU2tjfXMh",
    redirect_uri: `${window.location.origin}`
  })).pipe(
    shareReplay(1), catchError(err => throwError(err))
  )
  );

  isAuthenticated$: Observable<boolean> = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())));


  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  loggedIn: boolean = null;

  constructor(private router: Router, private store: Store<RootState>) {
    this.localAuthSetup();
    this.handleAuthCallback();
  }
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => { this.userProfileSubject$.next(user) })
    );
  }

  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/'): Observable<void> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) =>
        client.loginWithRedirect({
          redirect_uri: `${window.location.origin}/lesson`,
          appState: { target: redirectPath }
        })));
  }

  handleAuthCallback(): Observable<{ loggedIn: boolean, targetUrl: string }> {
    console.log(window.location.search);

    return of(window.location.search).pipe(
      concatMap(params => {
        return iif(() => params.includes('code=') && params.includes('state='),
          this.handleRedirectCallback$.pipe(concatMap(cbRes =>
            this.isAuthenticated$.pipe(take(1),

              map(loggedIn => ({
                loggedIn,
                targetUrl: cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/'
              }))))),
          this.isAuthenticated$.pipe(take(1), map(loggedIn => ({ loggedIn, targetUrl: null }))))
      }));
  }

  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: "Gl2tqzLj5G9sZX2O1vLXp7EyU2tjfXMh",
        returnTo: `${window.location.origin}`
      });
    });
  }

  handleAuthFail(stateUrl: string): Observable<void> {
    let rejectemail$ = this.store.select(Selectors.getUserEmail)
    rejectemail$.subscribe(rejectemail => {
      let domain = rejectemail.split("@")[1]
      if (domain != 'midlandu.edu') {
        this.router.navigate(['/unauthorized'])
        return
      }
      else {
        this.login(stateUrl);
        return
      }
    })
    return
  }

}