import { LoginPageActions, AuthApiActions } from '../actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  error: string | undefined;
  pending: boolean;
}

export const initialState: State = {
  error: undefined,
  pending: false,
};

const loginPageReducer = createReducer(
  initialState,
  on(LoginPageActions.login, state => ({ ...state, error: undefined, pending: true })),
  on(AuthApiActions.loginSuccess, state => ({ ...state, error: undefined, pending: false })),
  on(AuthApiActions.loginFailure, (state, action) => {
    return { ...state, error: action.error, pending: false };
  }),
);

export function reducer(state = initialState, action: AuthApiActions.AuthApiActionsUnion | LoginPageActions.LoginPageActionsUnion): State {
  return loginPageReducer(state, action);
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
