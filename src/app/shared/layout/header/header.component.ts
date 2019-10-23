import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';
import { filter, map } from 'rxjs/operators';
import { logout } from '../../../auth/actions/auth.actions';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  loggedIn$ = this.store$.pipe(select(fromAuth.getLoggedIn));
  username$ = this.store$.pipe(
    select(fromAuth.getUser),
    filter(user => !!user),
    map(user => user.username),
  );

  constructor(private readonly store$: Store<fromAuth.State>) {}

  logout(): void {
    this.store$.dispatch(logout());
  }
}
