import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
},
)
export class DeployFormularioService {

  public updateProcessEmit = new EventEmitter();

  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }

  public buscarDeploy(id: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/deploy/${id}`);
  }

  public salvarDeploy(Deploy: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/deploy`, Deploy);
  }

  public implantar(id: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/deploy/implantar/${id}`, {});
  }

  public habilitarDeploy(id: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/deploy/${id}`, {});
  }

  public listaDeploys(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/deploy`);
  }

  public refreshDeploy(key: string): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/deploy/update/${key}`);
  }

  public removerDeploy(id: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/deploy/${id}`);
  }

  public ativarInstancia(request: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/deploy/suspender`, request);
  }

  public ativarProcesso(request: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/deploy/process/suspender`, request);
  }
}
