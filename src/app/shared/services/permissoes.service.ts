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
export class PermissoesService {


  constructor(private readonly http: HttpClient) { }

  public buscarGrupo(groupId: any): Observable<Permissao> {
    return this.http.get<Permissao>(`${environment.urlApi}/usuario/permissoes/${groupId}`);
  }

  public listaPerfisGrupo(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/usuario/permissoes/grupos`);
  }

  public listaPermissoes(): Observable<Permissao[]> {
    return this.http.get<Permissao[]>(`${environment.urlApi}/usuario/permissoes`);
  }

  public criarPermissao(grupo: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/usuario/permissoes`, grupo);
  }

    public atualizarGrupoPermissao(isUser: boolean,grupo: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/usuario/permissoes/${isUser}`, grupo);
  }

  public atualizarPermissao(groupId: string, userId: string): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/usuario/permissoes/update/${groupId}/${userId}`, {});
  }

  public removerPermissao(groupId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/usuario/permissoes/${groupId}`);
  }

}
