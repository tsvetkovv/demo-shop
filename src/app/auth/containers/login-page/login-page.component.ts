import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as fromAuth from '../../reducers';
import { select, Store } from '@ngrx/store';
import { Credentials } from '../../models/user.model';
import { LoginPageActions } from '../../actions';

@Component({
  selector: 'ds-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private readonly store: Store<fromAuth.State>) {}

  onSubmit(credentials: Credentials): void {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
