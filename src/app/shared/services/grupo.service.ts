import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { OAuthService } from 'angular-oauth2-oidc';
import { TipoGrupo } from '../models/tipo-grupo.enum';


@Injectable({
  providedIn: 'root'
},
)
export class GrupoService {


  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }


  public buscarGrupo(groupId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/find/${groupId}`);
  }

  public buscarGrupoPorNome(nome: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/search/${nome}`);
  }

  public listaGrupos(type: TipoGrupo): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/${type}?size=${100}`);
  }

  public criarGrupo(grupo: any, type: TipoGrupo): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/usuario/grupos/${type}`, grupo);
  }

  public atualizarGrupo(grupo: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/usuario/grupos/${grupo.id}`, grupo);
  }

  public removerGrupo(groupId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/usuario/grupos/${groupId}`);
  }

  public listaMembrosGrupo(idGrupo: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/usuario/membros/${idGrupo}`);
  }

}
