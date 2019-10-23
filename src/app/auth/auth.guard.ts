import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromAuth from './reducers';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(private readonly store: Store<fromAuth.State>, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loggedIn$.pipe(
      map(logged => {
        if (logged) {
          return true;
        }

        return this.router.parseUrl('/login');
      }),
    );
  }
}
