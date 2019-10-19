import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavItemComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
