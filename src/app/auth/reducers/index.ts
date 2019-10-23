import * as fromAuth from './auth.reducers';
import * as fromLoginPage from './login-page.reducers';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthApiActions } from '../actions';

interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState, AuthApiActions.AuthApiActionsUnion> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthStatusStatus = createSelector(
  selectAuthState,
  state => state.status,
);

export const getUser = createSelector(
  selectAuthStatusStatus,
  fromAuth.getUser,
);

export const getLoggedIn = createSelector(
  getUser,
  user => !!user,
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage,
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError,
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending,
);
