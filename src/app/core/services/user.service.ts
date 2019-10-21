import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http
      .get<
        [
          {
            id: number;
            login: string;
            password: string;
            roleId: number;
          },
        ]
      >('/users', {
        params: {
          login: username,
        },
      })
      .pipe(
        map(([{ id, login, roleId }]) => ({
          id,
          username: login,
          role: roleId === 0 ? 'user' : 'admin',
        })),
      );
  }
}
