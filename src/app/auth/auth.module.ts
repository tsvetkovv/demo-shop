import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { JwtService } from './jwt.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent, LoginPageComponent],
  providers: [JwtService],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
