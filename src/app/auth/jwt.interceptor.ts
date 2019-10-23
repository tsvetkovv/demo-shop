import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './services/jwt.service';
import { tap } from 'rxjs/operators';

const sessionTokenHeaderName = 'Session-Token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = this.jwtService.getToken();
    const newRequest = token
      ? request.clone({
          setHeaders: {
            [sessionTokenHeaderName]: token,
          },
        })
      : request;

    return next.handle(newRequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.headers.has(sessionTokenHeaderName)) {
          const receivedToken = event.headers.get(sessionTokenHeaderName);
          this.jwtService.saveToken(receivedToken);
        }
      }),
    );
  }
}
