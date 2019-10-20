import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  getToken(): string | null {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: string): void {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}
