import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
},
)
export class GrupoSignatarioService {


  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }


  public buscarGrupo(groupId: any): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/signer/${groupId}`);
  }

  public buscarGrupoPorNome(nome: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/signer/search/${nome}`);
  }

  public listaGrupos(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/signer?size=${100}`);
  }

  public listaDepartamentos(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/signer?size=${100}`);
  }

  public listaDepartamentosCamunda(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/usuario/grupos/signer?type=DEPARTMENT`);
  }

  public criarGrupo(grupo: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/usuario/grupos/signer`, grupo);
  }

  public atualizarGrupo(grupo: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/usuario/grupos/signer`, grupo);
  }

  public removerDepartamento(groupId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/usuario/grupos/signer/${groupId}`);
  }

}
