import { AppMenu } from '@/base/menu/menu.component';
import { Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-painel-sidebar',
  standalone: true,
  imports: [
    AppMenu,
    RouterModule
    ],
  template: `
  <div class="layout-sidebar">
  <app-menu></app-menu>
</div>

  `
 })
export class PainelSidebarComponent {
  constructor(public el: ElementRef) { }
}
