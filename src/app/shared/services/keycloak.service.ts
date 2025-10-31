import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { AuthService } from '@/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
},
)
export class KeycloakService {


  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient) { }


  public getPerfil(): Observable<any> {
    const token = sessionStorage.getItem('account_token');

    if (!token || token == null) {
      this.authService.redirectAccount();
      return new Observable();
    }

    return this.http.get<any>(`${environment.authConfig.issuer}/account?userProfileMetadata=true`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json',
        }, withCredentials: true
      });
  }

  public salvarPerfil(userData: any): Observable<any> {
    const token = sessionStorage.getItem('account_token');

    if (!token || token == null) {
      this.authService.redirectAccount();
      return new Observable();
    }

    return this.http.post<any>(`${environment.authConfig.issuer}/account`,
      userData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json',
        }, withCredentials: true
      });
  }

  public listaCredenciais(): Observable<any[]> {
    const token = sessionStorage.getItem('account_token');

    if (!token || token == null) {
      this.authService.redirectAccount();
      return new Observable();
    }

    return this.http.get<any>(`${environment.authConfig.issuer}/account/credentials`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json',
        }, withCredentials: true
      });
  }

  public listaSessionsDevices(): Observable<any[]> {
    const token = sessionStorage.getItem('account_token');

    if (!token || token == null) {
      this.authService.redirectAccount();
      return new Observable();
    }

    return this.http.get<any>(`${environment.authConfig.issuer}/account/sessions/devices`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json',
        }, withCredentials: true
      });
  }

  public removerSessionsDevices(sessionId: string): Observable<any[]> {
    const token = sessionStorage.getItem('account_token');

    if (!token || token == null) {
      this.authService.redirectAccount();
      return new Observable();
    }

    return this.http.delete<any>(`${environment.authConfig.issuer}/account/sessions/${sessionId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json',
        }, withCredentials: true
      });
  }

  public getTokenAccount(code: string, redirect: string, codeVerifier: string): Observable<any> {
    const body = new HttpParams({
      fromObject: {
        grant_type: 'authorization_code',
        client_id: 'account-console',
        redirect_uri: `${window.location.origin}/${redirect ?? 'conta/auth'}`,
        code,
        code_verifier: codeVerifier
      }
    });

    return this.http.post<any>(
      `${environment.authConfig.issuer}/protocol/openid-connect/token`,
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        withCredentials: true
      }
    );
  }
}

export function generateCodeVerifier(length: number = 128): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let verifier = '';
  for (let i = 0; i < length; i++) {
    verifier += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return verifier;
}

export async function generateCodeChallenge(codeVerifier?: string): Promise<string> {

  const verifier = sessionStorage.getItem('PKCE_verifier');

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier ?? verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function generatePkcePair(): Promise<{ verifier: string; challenge: string }> {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  return { verifier, challenge };
}
