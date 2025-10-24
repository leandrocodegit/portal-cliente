import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
},
)
export class ProcessoService {


  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }

  public buscarProcesso(processId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-definition/${processId}`);
  }

  public quantidadeProcessos(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-definition/count`);
  }

  public listarProcessosByKey(key: string): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-definition?key=${key}`);
  }

  public listarProcessos(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-definition`);
  }

  public listarInstanciasProcessos(processId: any): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-instance?processDefinitionId=${processId}`);
  }

  public quantidadeInstanciasProcessos(processId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-instance/count?processDefinitionId=${processId}`);
  }

  public quantidadeInstanciasAtivasProcessos(processId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-instance/count?processDefinitionId=${processId}&active=true`);
  }

  public criarGuupo(usuario: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/usuario`, usuario);
  }

  public atualizarUsuario(request: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/usuario`, request);
  }

  public listaUsuarios(page: PaginatorState): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario?page=${page.page}&size=${page.rows}`);
  }

  public listaGruposAcesso(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos`);
  }

  public joinGruposAcesso(idUsuario: any, idGrupo: any): Observable<any[]> {
    return this.http.put<any>(`${environment.urlApi}/usuario/grupos/${idUsuario}/${idGrupo}`, {});
  }

  public deleteGruposAcesso(idUsuario: any, idGrupo: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/usuario/grupos/${idUsuario}/${idGrupo}`);
  }

  public buscarUsuario(id: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/usuario/${id}`);
  }

  public infoUsuario(id: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/usuario/info/${id}`);
  }

  public listaSessoesUsuarios(userId: any): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario/sessions/${userId}`);
  }

  public logoutUsuario(user: any): Observable<any[]> {
    return this.http.put<any>(`${environment.urlApi}/usuario/logout`, user);
  }

  public ativarUsuario(userId: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/usuario/ativar/${userId}`, {});
  }

  public removerUsuario(userId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/usuario/${userId}`);
  }
}
