import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { PaginaServico } from '../models/pagina-servico.model';


@Injectable({
  providedIn: 'root'
},
)
export class PaginaService {


  constructor(
    private readonly http: HttpClient) { }

  public buscarPagina(paginaId: any): Observable<PaginaServico> {
    return this.http.get<PaginaServico>(`${environment.urlApi}/protocolos/pagina/${paginaId}`);
  }

  public listarPaginas(): Observable<PaginaServico[]> {
    return this.http.get<PaginaServico[]>(`${environment.urlApi}/protocolos/pagina`);
  }

  public criarPagina(pagina: PaginaServico): Observable<PaginaServico> {
    return this.http.post<PaginaServico>(`${environment.urlApi}/protocolos/pagina`, pagina);
  }

  public duplicarPagina(paginaId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/protocolos/pagina/duplicar/${paginaId}`, {});
  }

  public removerPagina(paginaId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/protocolos/pagina/${paginaId}`);
  }

  public habilitarPagina(paginaId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/protocolos/pagina/${paginaId}`, {});
  }
}
