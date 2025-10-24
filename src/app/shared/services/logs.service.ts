import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Permissao } from '../models/permissoes.model';


@Injectable({
  providedIn: 'root'
},
)
export class LogsService {


  constructor(private readonly http: HttpClient) { }


  public logsInstanciaTarefaExterna(processInstanceId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/external-task-log?processInstanceId=${processInstanceId}&sortBy=timestamp&sortOrder=desc`);
  }

  public logsInstanciaIdentity(processInstanceId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/identity-link-log?rootProcessInstanceId=${processInstanceId}&sortBy=time&sortOrder=desc`);
  }

  public logsInstanciaJobs(processInstanceId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/job-log?processInstanceId=${processInstanceId}&sortBy=timestamp&sortOrder=desc`);
  }

  public getEventos(processInstanceId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/event-subscription?processInstanceId=${processInstanceId}`);
  }

}
