import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { OAuthService } from 'angular-oauth2-oidc';
import { ProcessInstance } from '../models/process-instance.model';
import { Count } from '../models/count.mopdel';
import { VariableTypedMap } from '../models/variable-typed-map .model';


@Injectable({
  providedIn: 'root'
},
)
export class InstanciaService {

  private detalhesInstancia = new Subject<any>();

  constructor(
    private readonly http: HttpClient) { }

    detalhesInstancia$ = this.detalhesInstancia.asObservable();

  show(value: any) {
    this.detalhesInstancia.next(value);
  }

  hide() {
    this.detalhesInstancia.next({
      view: false
    });
  }

  public buscarInstancia(instanceId: any): Observable<ProcessInstance> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-instance/${instanceId}`);
  }

  public buscarInstanciaPorProtocolo(businessKey: any): Observable<ProcessInstance[]> {
    return this.http.get<ProcessInstance[]>(`${environment.urlApi}/processo/api/v1/process-instance?businessKey=${businessKey}`);
  }

  public buscarVencimentoInstancia(instanceId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-instance/${instanceId}/variables/dataVencimento`);
  }

  public buscarFormularioCadastro(instanceId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-instance/${instanceId}/variables/formKey`);
  }

  public listarVariaveis(instanceId: any): Observable<VariableTypedMap[]> {
    return this.http.get<VariableTypedMap[]>(`${environment.urlApi}/processo/api/v1/variable-instance?processInstanceIdIn=${instanceId}`);
  }

  public listarProcessos(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/process-definition`);
  }

  public comentariosInstancia(instanceId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/simod-rest/base/comment/${instanceId}`);
  }

  public timeLine(instanceId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/simod-rest/base/timeline/${instanceId}`);
  }

  public listaAnexosInstancia(taskId: any): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/upload/v1/simod-rest/base/attachment/${taskId}`, {});
  }

  public listarInstanciasAtivas(page?: any): Observable<ProcessInstance[]> {
    return this.http.get<ProcessInstance[]>(`${environment.urlApi}/processo/api/v1/process-instance?active=true&${page}`);
  }

  public listarInstanciasProcessos(processId: any, page?: any): Observable<ProcessInstance[]> {
    return this.http.get<ProcessInstance[]>(`${environment.urlApi}/processo/api/v1/process-instance?processDefinitionId=${processId}&${page}`);
  }

  public countInstanciasAtivas(): Observable<Count> {
    return this.http.get<Count>(`${environment.urlApi}/processo/api/v1/process-instance/count?active=true`);
  }

  public countInstanciasProcessos(processId: any): Observable<Count> {
    return this.http.get<Count>(`${environment.urlApi}/processo/api/v1/process-instance/count?processDefinitionId=${processId}`);
  }

  public quantidadeInstanciasProcessos(processId: any): Observable<Count> {
    return this.http.get<Count>(`${environment.urlApi}/processo/api/v1/process-instance/count?processDefinitionId=${processId}`);
  }

  public quantidadeInstanciasAtivasProcessos(processId: any): Observable<Count> {
    return this.http.get<Count>(`${environment.urlApi}/processo/api/v1/process-instance/count?processDefinitionId=${processId}&active=true`);
  }

  public ativarInstancia(instanceId: any, suspended: boolean): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/processo/api/v1/process-instance/${instanceId}/suspended`, {
      suspended: suspended
    });
  }

  public alterarVariavel(instanceId: any, variavel: any): Observable<any> {
    console.log('Variavel', variavel);

    return this.http.put<any>(`${environment.urlApi}/processo/api/v1/process-instance/${instanceId}/variables/${variavel.name}`, variavel);
  }

  public removerVariavelArquivo(instanceId: any, variavel: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/upload/v1/process-instance/${instanceId}/variables/${variavel.name}`);
  }

  public anexarDocumentoFormulario(instanceId: any, files: any, variavel: any): Observable<any> {

    const formData = new FormData();

    formData.append("name", variavel.name)
    formData.append("type", variavel.name)
    formData.append("valueInfo", variavel.valueInfo.filename)
    for (const key in files.data) {
      const value = files.data[key];

      if (typeof value === 'string' && value.startsWith("files::")) {
        const file = files.files.get(value);
        if (file) {
          formData.append('file', file[0]);
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    return this.http.post<any>(`${environment.urlApi}/processo/api/upload/v1/process-instance/${instanceId}/variables/${variavel.name}`, formData);
  }
}
