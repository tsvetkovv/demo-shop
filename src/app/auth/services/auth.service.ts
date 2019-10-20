import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login({ username, password }: Credentials): Observable<User> {
    return this.http.post('/login', { login: username, password }, { responseType: 'text' }).pipe(
      switchMap(() => {
        return this.userService.getUserByUsername(username);
      }),
    );
  }

  logout(): Observable<true> {
    this.jwtService.destroyToken();

    return of(true);
  }

  constructor(private readonly http: HttpClient, private readonly userService: UserService, private readonly jwtService: JwtService) {}
}
