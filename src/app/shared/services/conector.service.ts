import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Permissao } from '../models/permissoes.model';


@Injectable({
  providedIn: 'root'
},
)
export class ConectorService {


  constructor(private readonly http: HttpClient) { }

  public criarConector(conector: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/simod-rest/conector`, conector);
  }

  public listaConectores(isAuth: boolean): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/simod-rest/conector/list/${isAuth}`);
  }

  public removerConector(conectorId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/v1/simod-rest/conector/${conectorId}`);
  }

  public executarConector(conectorId: any): Observable<Permissao> {
    return this.http.get<Permissao>(`${environment.urlApi}/processo/api/v1/simod-rest/conector/execute/${conectorId}`);
  }

  public buscarConector(conectorId: any): Observable<Permissao> {
    return this.http.get<Permissao>(`${environment.urlApi}/processo/api/v1/simod-rest/conector/${conectorId}`);
  }

    public enabledConector(conectorId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/simod-rest/conector/enabled/${conectorId}`, {});
  }

  public listaPerfisGrupo(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/usuario/permissoes/grupos`);
  }

  public listaPermissoes(): Observable<Permissao[]> {
    return this.http.get<Permissao[]>(`${environment.urlApi}/usuario/permissoes`);
  }



  public atualizarGrupoPermissao(isUser: boolean, grupo: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/usuario/permissoes/${isUser}`, grupo);
  }

  public atualizarPermissao(groupId: string, userId: string): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/usuario/permissoes/update/${groupId}/${userId}`, {});
  }

  public removerPermissao(groupId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/usuario/permissoes/${groupId}`);
  }

}
