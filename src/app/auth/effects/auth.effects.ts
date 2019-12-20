import { Injectable } from '@angular/core';
import { AuthApiActions, LoginPageActions, AuthActions } from '../actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as fromAuth from '../reducers';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  @Effect() login = this.actions$.pipe(
    ofType(LoginPageActions.login),
    map(action => action.credentials),
    exhaustMap(auth =>
      this.authService.login(auth).pipe(
        map(user => AuthApiActions.loginSuccess({ user })),
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 400) {
            return of(AuthApiActions.loginFailure({ error: 'Wrong login or password' }));
          }
        }),
      ),
    ),
  );

  @Effect({ dispatch: false }) loginSuccess = this.actions$.pipe(
    ofType(AuthApiActions.loginSuccess),
    tap(() => this.router.navigate(['/'])),
  );

  @Effect({ dispatch: false }) logout = this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.authService.logout()),
  );

  @Effect({ dispatch: false }) loginRedirect$ = this.actions$.pipe(
    ofType(AuthApiActions.loginRedirect, AuthActions.logout),
    tap(() => {
      this.router.navigate(['/login']);
    }),
  );

  constructor(
    private readonly store$: Store<fromAuth.State>,
    private readonly actions$: Actions<LoginPageActions.LoginPageActionsUnion>,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}
}
