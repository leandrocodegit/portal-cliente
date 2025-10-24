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
export class ExternalTaskService {


  constructor(private readonly http: HttpClient) { }


  public listarTarefas(processInstanceId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/external-task?processInstanceId=${processInstanceId}`);
  }

  public detalhesErro(externalTaskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/external-task/${externalTaskId}/errorDetails?mediaType=text/plain`);
  }

}
