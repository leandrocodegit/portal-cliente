import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoadComponent } from 'src/app/shared/components/load/load.component';
import { LayoutService } from 'src/app/base/services/layout.service';
import { LoadService } from '@/shared/components/preload/load.service';

declare var turnstile: any;

@Component({
  selector: 'app-autenticacao',
  imports: [
    CommonModule,
    RouterModule,
    LoadComponent
  ],
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.scss'
})
export class AutenticacaoComponent implements OnInit, OnDestroy {

  protected host?: any;
  protected checando = false;
  protected intervalo: any;
  protected intervaloCount: any;
  protected count = 0;
  @ViewChild('turnstile') turnstileElement!: ElementRef;

  constructor(private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
    private readonly loadService: LoadService,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {

    try {
      this.intervalo = setInterval(() => {
        if (this.oauthService?.hasValidAccessToken()) {

       //   this.oauthService?.loadUserProfile().then(user => console.log('User:', user));
          //this.oauthService.setupAutomaticSilentRefresh();


          clearInterval(this.intervalo);
          if (this.router?.url.includes('/auth'))
            if (this.loadService.ultimoAcesso())
              this.router.navigate([this.loadService.ultimoAcesso()]);
        }
        if (sessionStorage.getItem('PKCE_verifier') == null) {
          clearInterval(this.intervalo);
          this.router.navigate(['/login']);
        }
      }, 2000)
    } catch (error) {
      clearInterval(this.intervalo);
      this.router.navigate(['/login']);
    }

  }

  checkTurnstile(): void {
    if (!this.checando) {
      this.checando = true;
      if (typeof turnstile !== 'undefined') {
        turnstile.render(this.turnstileElement.nativeElement, {
          sitekey: '0x4AAAAAABer05zX5CdsZSWY',
          callback: (token: string) => {
            this.http.post<any>(`https://challenges.cloudflare.com/turnstile/v0/siteverify`, {
              secret: "0x4AAAAAABer0yN9pJ6WbFuF1qL5sU5ENwk",
              response: token
            }).subscribe(response => {
              if (response.success && this.router.url.includes('/auth'))
                this.router.navigate(['/painel']);
            }, error => {
              //this.oauthService.logOut();
              if (this.router.url.includes('/auth'))
                this.router.navigate(['/painel']);
            });

          }
        });
      } else {
        console.error('Turnstile não carregado.');
      }
    }
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    if (this.intervaloCount) {
      clearInterval(this.intervaloCount);
    }
  }
}
