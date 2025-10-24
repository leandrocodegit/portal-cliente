import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FooterWidget } from './components/footerwidget';
import { TopbarWidget } from './components/topbar/topbar.component';
import { InstitucionalComponent } from './institucional/institucional.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
      RouterModule,
      RippleModule,
      StyleClassModule,
      ButtonModule,
      DividerModule,
      TopbarWidget,
      FooterWidget,
      InstitucionalComponent
    ],
    template: `
    <div class="layout-wrapper bg-surface-0 dark:bg-surface-900">
    <topbar-widget class="py-6 px-6 mx-0 flex items-center justify-between relative lg:static" style="border-bottom: solid var(--primary-color);"/>
        <div class="landing" style="padding-top: 0;">
            <div class="layout-main">
                <app-institucional/>
            </div>
        </div>
        <div class="layout-mask animate-fadein">
        <footer-widget />
        </div>
    </div>
    `
})
export class Landing {}
