import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Filtro } from 'src/app/modulos/filtros/models/filtro.model';
import { HistoricTask } from '../models/history-task.model';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
},
)
export class FiltroService {

  private updateFiltro = new Subject<Filtro>();
  public $updateFiltro = this.updateFiltro.asObservable();
  private closePopover = new Subject();
  public $closePopover = this.closePopover.asObservable();

  constructor(
    private readonly http: HttpClient) { }

  public recarregarFiltro(filtro: Filtro) {
    this.updateFiltro.next(filtro);
  }

  public fecharPopover(){
    this.closePopover.next(true)
  }

  public listaFiltros(): Observable<Filtro[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/filter`);
  }

  public removerFiltro(filtroId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/v1/filter/${filtroId}`);
  }

  public quantidadeTarefas(filtroId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/filter/${filtroId}/count`);
  }

  public salvarFiltro(filtro: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/simod-rest/base/filter/create`, filtro);
  }

  public buscarFiltro(filtroId: any): Observable<Filtro> {
    return this.http.get<Filtro>(`${environment.urlApi}/processo/api/v1/filter/${filtroId}`);
  }

  public listaAutorizacoesFiltro(filtroId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/authorization?resourceId=${filtroId}&resourceType=5`);
  }

  public filtrarTarefas(filtro: Filtro): Observable<Task[]> {
    return this.http.post<Task[]>(`${environment.urlApi}/processo/api/v1/filter/${filtro.id}/list?sortBy=created&sortOrder=asc`, {
      "processVariables": [],
      "taskVariables": [],
      "caseInstanceVariables": [],
      "firstResult": 0,
      "maxResults": 15,
      sorting: filtro?.properties?.sorting,
      "active": true
    });
  }

}
