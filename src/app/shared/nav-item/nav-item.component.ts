import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ds-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  @Input() link: string;
}
