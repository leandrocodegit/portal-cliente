import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../../app.configurator';
import { OAuthService } from 'angular-oauth2-oidc';
import { SelectModule } from 'primeng/select';
import { authConfig } from 'src/app/app.module';
import { AuthService } from '@/auth/services/auth.service';
import { LayoutService } from '../services/layout.service';
import { PerfilBar } from '../sidebar/perfil.login';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    AppConfigurator,
    RouterModule,
    SelectModule,
    PerfilBar,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  @Input() noToogle = false;
  protected items!: MenuItem[];
  protected isLogin: any;

  constructor(
    public readonly layoutService: LayoutService,
    private readonly oauthService: OAuthService,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.isLogin = this.oauthService.hasValidAccessToken() || this.authService.valid();
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    this.layoutService.setPreferencias();
  }


  login(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oauthService.tryLoginCodeFlow().then((data) => {
        console.log('tryLoginCodeFlow', data);
      });
    });
  }

  sideBarOpen() {
    this.layoutService.onMenuToggle();
    if (this.layoutService.isDesktop())
      this.layoutService.setPreferencias();
  }

  logout() {
    this.oauthService.configure(authConfig);
     this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
     this.oauthService.logOut();
    });
  }
}
