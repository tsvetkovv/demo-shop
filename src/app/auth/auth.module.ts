import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers';
import { AuthRoutingModule } from './auth-routing.module';
import { JwtService } from './services/jwt.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';

@NgModule({
  declarations: [LoginFormComponent, LoginPageComponent],
  providers: [
    JwtService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
