import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { PaginatorState } from 'primeng/paginator';
import { OAuthService } from 'angular-oauth2-oidc';
import { Filtro } from 'src/app/modulos/filtros/models/filtro.model';


@Injectable({
  providedIn: 'root'
},
)
export class PermissaoService {


  constructor(
    private readonly http: HttpClient) { }


  public listaFiltros(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/filter`);
  }

  public removerFiltro(filtroId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/v1/filter/${filtroId}`);
  }

  public quantidadeTarefas(filterId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/filter/${filterId}/count`);
  }

  public criarFiltro(filtro: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/filter`, filtro);
  }

  public buscarFiltro(filtroId: any): Observable<Filtro> {
    return this.http.get<Filtro>(`${environment.urlApi}/processo/api/v1/filter/${filtroId}`);
  }

  public atualizarFiltro(filtro: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/processo/api/v1/filter/${filtro.id}`, filtro);
  }

    public filtrarTarefas(filterId: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.urlApi}/processo/api/v1/filter/${filterId}/list?sortBy=created&sortOrder=asc`, {
      "processVariables": [],
      "taskVariables": [],
      "caseInstanceVariables": [],
      "firstResult": 0,
      "maxResults": 15,
      "sorting": [
        {
          "sortBy": "created",
          "sortOrder": "desc"
        }
      ],
      "active": true
    });
  }

}
