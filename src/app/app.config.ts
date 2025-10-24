import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { PRIME_NG_CONFIG, providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { provideNgxMask } from 'ngx-mask'
import { NgxMaskConfig } from 'ngx-mask'
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {  getPtBrPaginatorIntl } from './shared/services/CustomPaginator';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from './auth/services/auth.service';
import { voidPipe } from './shared/pipes/vazio.pipe';

const maskConfig: Partial<NgxMaskConfig> = {
  validation: false,
};

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'DD/MM/YYYY hh:mm' },
  display: {
    dateInput: 'DD/MM/YYYY hh:mm',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
registerLocaleData(localePt);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideAnimationsAsync(),
    provideOAuthClient(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    provideNativeDateAdapter(),
    provideNgxMask(),
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService,
    ConfirmationService,
    DialogService,
    AuthService,
    voidPipe
  ]
};
