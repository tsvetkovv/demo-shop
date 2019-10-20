import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromAuth from './reducers';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  private readonly loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(private readonly store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loggedIn$.pipe(map(logged => !logged));
  }
}
