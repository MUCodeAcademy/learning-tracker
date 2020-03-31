import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError, iif } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "midland-code.auth0.com",
      client_id: "Gl2tqzLj5G9sZX2O1vLXp7EyU2tjfXMh",
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;
// ---------------------------------------------------------------------------------------
  constructor(private router: Router) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }
// -----------------------------------------------------------------------------------
  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => {console.log(user);this.userProfileSubject$.next(user)})
    );
  }
// -----------------------------------------------------------------------------
  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }
// --------------------------------------------------------------------------
login(redirectPath: string = '/'): Observable<void> {
  return this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => 
      client.loginWithRedirect({
      redirect_uri: `${window.location.origin}/lesson`,
      appState: { target: redirectPath }
    })));
}
// -----------------------------------------------------------------------------
handleAuthCallback(): Observable<any> {
  return of(window.location.search).pipe(
   concatMap(params => {
     return iif(() => params.includes('code=') && params.includes('state='),
        this.handleRedirectCallback$.pipe(concatMap(cbRes => 
           this.isAuthenticated$.pipe(take(1),
             tap(res=>console.log(res)),
             map(loggedIn => ({ loggedIn,
           targetUrl: cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/'
         }))))),
       this.isAuthenticated$.pipe(take(1), map(loggedIn => ({ loggedIn, targetUrl: null }))))}));
}
// ---------------------------------------------------------------------------
  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "Gl2tqzLj5G9sZX2O1vLXp7EyU2tjfXMh",
        returnTo: `${window.location.origin}`
      });
    });
  }

}