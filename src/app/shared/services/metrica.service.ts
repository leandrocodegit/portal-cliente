import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { OAuthService } from 'angular-oauth2-oidc';
import { getCurrentAfterDate } from './util/DateUtil';
import { ProcessInstance } from '../models/process-instance.model';
import { HistoryProcessInstance } from '../models/history-process-instance.model';
import { HistoricTask } from '../models/history-task.model';
import { Count } from '../models/count.mopdel';
import { HistoryVariableInstance } from '../models/history-variable-instance.model';
import { Incident } from '../models/incident.model';


@Injectable({
  providedIn: 'root'
},
)
export class MetricaService {


  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }

  public getMetricas(filter: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/metrics/disk.free`);
  }

  public imprimirRelatorioTarefa(filter: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/relatorios/relatorios/task`, filter, { responseType: 'blob' as 'json' });
  }

  public imprimirRelatorioUsuarios(filter: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/relatorios/relatorios/user`, filter, { responseType: 'blob' as 'json' });
  }
}
