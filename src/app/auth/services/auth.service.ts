import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { catchError, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.dev';
import { Role } from '../models/role-auth.enum';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../app.module';


@Injectable({
  providedIn: 'root'
},
)
export class AuthService {


  constructor(
    private readonly oauthService: OAuthService,
    private readonly http: HttpClient,
    private readonly router: Router) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.urlApi + '/auth/login', JSON.stringify(
      {
        email: email,
        password: password
      }), environment.headers
    )
  }

  refreshToken(): Observable<boolean> {
    const body = new HttpParams()
      .set('client_id', authConfig.clientId)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', this.oauthService.getRefreshToken());

    return this.http.post<any>(
      `${environment.authConfig.issuer}/protocol/openid-connect/token`,
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }
    ).pipe(
      map(response => {
        // aqui você atualiza os tokens
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('refresh_token', response.refresh_token);
        sessionStorage.setItem('id_token', response.id_token);
        sessionStorage.setItem('refresh_expires_in', response.refresh_expires_in);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  /* access_token
  :
  expires_in
  :
  1500
  id_token
  :
  not-before-policy
  :
  0
  refresh_expires_in
  :
  7200
  refresh_token
  :
  scope
  :
  "openid email profile"
  session_state
  :
  "62dffbb1-f4cd-4793-8d9c-b0980da3a7c5"
  token_type
  :
  "Bearer" */


  setCliente(data: any) {
    localStorage.setItem("cliente.nome", data.nome);
  }

  get clienteId(): string {
    const clienteId = localStorage.getItem("token.clienteId");
    return clienteId ? clienteId : '';
  }

  get accessToken(): string | null {
    return localStorage.getItem("token.access");
  }

  public valid(): boolean {
    try {
      const expireMillis = this.decodeToken(this.oauthService.getAccessToken()).exp;
      let expire: number = Number.parseInt(expireMillis) * 1000 - 10000;
      const now = Date.now();
      return now < expire;
    } catch (error) {
      return false;
    }
  }

  public isLoggedIn() {
    try {
      const expireMillis = this.decodeToken(this.oauthService.getRefreshToken()).exp;
      let expire: number = Number.parseInt(expireMillis) * 1000 + 20000;
      const now = Date.now();
      return now < expire;
    } catch (error) {
      return false;
    }
  }

  getUserSession() {
    const userJson = sessionStorage.getItem('id_token_claims_obj')
    if (!userJson)
      return {};
    return JSON.parse(userJson);
  }

  public extrairEmailUsuario() {
    try {
      const jwt = this.decodePayloadJWT();
      return jwt.email;
    } catch (error) {
      return '';
    }
  }

  public extrairIdUsuario() {
    try {
      const jwt = this.decodePayloadJWT();
      return jwt.sub;
    } catch (error) {
      return '';
    }
  }

  public extrairGruposUsuario(): string[] {
    try {
      const jwt = this.decodePayloadJWT();
      return jwt.grupos;
    } catch (error) {
      return [];
    }
  }


  public extrairClienteId(token: string) {
    try {
      const jwt = this.decodeToken(token);
      const clienteId = jwt['azp'];
      return clienteId ? clienteId : '';
    } catch (error) {
      return '';
    }
  }

  public decodeToken(token: string): any | null {
    try {
      if (token) {
        const decode = jwtDecode<any>(token);
        return decode;
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  public isBusiness() {
    try {
      const jwt = this.decodePayloadJWT();
      const business = jwt['business'];
      return business ? business : false;
    } catch (error) {
      return false;
    }
    return false;
  }

  isAuthorizedRoles(rolesData: Role[]): boolean {
    this.isLoggedIn();
    const tokenPayload = this.decodePayloadJWT();

    if (!tokenPayload || !tokenPayload.roles) {
      this.limparSessao();
      return false;
    }

    const userRoles: Role[] = tokenPayload.roles;

    if (!userRoles || !rolesData) {
      this.limparSessao();
      return false;
    }

    const hasRole = rolesData.some(role => userRoles.includes(role));

    if (!hasRole) {
      return false;
    }

    return true;
  }

  isAdmin(): boolean {
    return this.isAuthorizedRoles([Role.ADM]);
  }


  logout() {
    const idToken = sessionStorage.getItem('id_token');
    if (idToken == null) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    } else {
      const logoutUrl = `${environment.authConfig.issuer}/protocol/openid-connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${authConfig.postLogoutRedirectUri}`;
      window.location.href = logoutUrl;
    }
  }

  limparSessao() {
    localStorage.clear();
  }

  public decodePayloadJWT(): any | null {
    try {
      const token = this.oauthService.getAccessToken();
      if (token) {
        const decode = jwtDecode<any>(token);
        return decode;
      }
    } catch (error) {
      return null;
    }

    return null;
  }
}
