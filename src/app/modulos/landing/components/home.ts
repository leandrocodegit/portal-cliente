import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider'; 
import { FeaturesWidget } from './featureswidget';
import { HeroWidget } from './herowidget';
import { HighlightsWidget } from './highlightswidget';
import { PricingWidget } from './pricingwidget';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
      RouterModule,
      RippleModule,
      StyleClassModule,
      ButtonModule,
      DividerModule,
      FeaturesWidget,
      HeroWidget,
      HighlightsWidget,
      PricingWidget
    ],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
                 <hero-widget />
                <features-widget />
                <highlights-widget />
                <pricing-widget />

        </div>
    `
})
export class Home {}
