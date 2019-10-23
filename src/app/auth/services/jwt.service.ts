import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  getToken(): string | null {
    return window.sessionStorage['jwtToken'];
  }

  saveToken(token: string): void {
    window.sessionStorage.setItem('jwtToken', token);
  }

  destroyToken(): void {
    window.sessionStorage.removeItem('jwtToken');
  }
}
