import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Permissao } from '../models/permissoes.model';
import { AuthService } from '@/auth/services/auth.service';
import { UsuarioService } from './usuario.service';
import { MinhaContaService } from '@/modulos/minha-conta/services/minha-conta.service';


@Injectable({
  providedIn: 'root'
},
)
export class ReportService {


  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService) { }


  public listaReports(processInstanceId?: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/task/report?reportType=count&groupBy=processDefinition`);
  }

  public getEventsReports(incluirUsuario?: boolean): Observable<any[]> {
    if (incluirUsuario)
      return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/detail?userOperationId=${this.authService.extrairIdUsuario()}`);
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/detail`);
  }

  public getTaskReports(incluirFiltroUsuario: boolean, departamento?: boolean): Observable<any[]> {

    let query: any = {};

    if(incluirFiltroUsuario){
      query = {
      taskInvolvedUser: this.authService.extrairIdUsuario()
    };
    }

    if (departamento) {
      query = {
        taskInvolvedGroup: departamento,
        withCandidateGroups: true
      };
    }

    return this.http.post<any[]>(`${environment.urlApi}/processo/api/v1/history/task`, query);
  }

  public getProcessInstanceDurationReport(processDefinitionIdIn?: any): Observable<any[]> {
    if (processDefinitionIdIn)
      return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/process-instance/report?processDefinitionIdIn=${processDefinitionIdIn}&reportType=duration&periodUnit=month`);
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/process-instance/report?reportType=duration&periodUnit=month`);
  }

  public getHistoricProcessInstances(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/history/process-instance`);
  }

  public getMetrics(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/metrics`);
  }

    public getSystemHealth(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/simod-rest/base/metrica`);
  }

}
