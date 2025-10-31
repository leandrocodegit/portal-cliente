import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, debounceTime, filter, finalize, from, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoadService } from 'src/app/shared/components/preload/load.service';
import { MessageService } from 'primeng/api';
import { authConfig } from '@/app.module';
import { generateCodeChallenge } from '@/shared/services/keycloak.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private readonly loadService: LoadService,
    private readonly oauthService: OAuthService,
    private readonly messageService: MessageService) { }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isAccount = req.url.includes('/account') && !req.url.includes('/protocol/openid-connect/auth')

    if (isAccount && !this.loadService.isLoad) {
      this.loadService.show()
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          sessionStorage.removeItem('account_token');
          if (error.status === 401) {
           this.authService.redirectAccount();
          }else{
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado ao executar essa ação!' });
          }
          return throwError(() => error);
        }),
        tap(event => {
        if (event instanceof HttpResponse && req.method !== 'GET' && req.method !== 'OPTIONS') {
          this.messageService.add({ severity: 'success', summary: 'Concluido', detail: 'Salvo com sucesso' });
        }
      }),
        finalize(() => {
          this.loadService.hide()
        })
      );
    }

    const accessToken = this.authService.accessToken;

    if (req.url.includes('/realms') || req.url.endsWith('/token') || (req.url.includes('/auth') && !req.url.includes('/authorization')) || req.url.includes('/engine-rest')) {
      return next.handle(req);
    } else {
      req = this.addToken(req, this.oauthService.getAccessToken());
    }
    if (!req.url.includes('/download') && !req.url.includes('tema') && !req.url.endsWith('formKey'))
      this.loadService.show();
    var requisicao = next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        } else if (error.status === 403) {
          //this.authService.logout();
          this.router.navigate(['/login'])
          return throwError(() => error);
        }
        else {
          if (error.status == 409 && error?.error?.message && !req.url.endsWith('formKey'))
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: error?.error?.message });
          else if (error.status == 400 && error?.error?.message && !req.url.endsWith('formKey'))
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: error?.error?.message });
          return throwError(() => error);
        }
      }),
      tap(event => {
        if (event instanceof HttpResponse && req.method !== 'GET' && req.method !== 'OPTIONS' && !req.url.includes('tema') && !req.url.includes('/list') && !req.url.includes('/processo/api/v1/history/task') && !req.url.includes('/processo/api/v1/history/process-instance') && !req.url.includes('/relatorio')) {
          this.messageService.add({ severity: 'success', summary: 'Concluido', detail: 'Salvo com sucesso' });
        }
      }),
      finalize(() => {
        this.loadService.hide()
      }),

    );
    return requisicao;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null); // limpa antes de atualizar

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          const newToken = this.oauthService.getAccessToken();
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken); // emite para quem estava esperando
          return next.handle(this.addToken(request, newToken));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.error(error); // propaga o erro
          this.router.navigate(['/login']);
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      // se já está atualizando, espera o novo token e repete a requisição
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => next.handle(this.addToken(request, accessToken!)))
      );
    }
  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'X-User-ID': this.authService.extrairIdUsuario(),
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': !sessionStorage.getItem("X-Tenant-ID") ? authConfig.clientId : sessionStorage.getItem("X-Tenant-ID")!
      }
    });
  }
}
