import { AuthActions, AuthApiActions } from '../actions';
import { User } from '../models/user.model';
import { createReducer, on } from '@ngrx/store';

export interface State {
  user: User | undefined;
}

export const initialState: State = {
  user: undefined,
};

const authReducer = createReducer(initialState, on(AuthApiActions.loginSuccess, state => ({ ...state, user: state.user })), on(AuthActions.logout, () => initialState));

export function reducer(state = initialState, action: AuthApiActions.AuthApiActionsUnion | AuthActions.AuthActionsUnion): State {
  return authReducer(state, action);
}

export const getUser = (state: State) => state.user;
