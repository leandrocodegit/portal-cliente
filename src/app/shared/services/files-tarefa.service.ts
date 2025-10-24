import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { OAuthService } from 'angular-oauth2-oidc';
import { gerarDataForm } from './util/formularioUtil';


@Injectable({
  providedIn: 'root'
},
)
export class FilesTarefaService {


  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }


  public listaAnexos(taskId: any): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/upload/v1/task/${taskId}/attachment`, {});
  }

  public listaAnexosInstancia(instanceId: any): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/upload/v1/simod-rest/base/attachment/${instanceId}`, {});
  }

  public listaVariaveis(taskId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/task/${taskId}/form-variables`, {});
  }

  public listaVariaveisInstancia(instanceId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/upload/v1/variable-instance?processInstanceIdIn=${instanceId}`);
  }

  public resolveFormulario(task: any, files: any): Observable<any> {

    const formData = new FormData();

    for (const key in files.data) {
      const value = files.data[key];

      if (typeof value === 'string' && value.startsWith("files::")) {
        const file = files.files.get(value);
        if (file) {
          formData.append(key, file[0]);
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    return this.http.post<any>(`${environment.urlApi}/processo/api/upload/v1/task/${task.id}/forms/create?processInstanceId=${task.processInstanceId}`, formData);
  }

  public anexarDocumentoFormulario(task: any, data: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/upload/v1/task/${task.id}/forms/create?processInstanceId=${task.processInstanceId}`, gerarDataForm(data));
  }

  public anexarDocumento(content: any): Observable<any> {

    const formData = new FormData();
    formData.append('processInstanceId', content.task.processInstanceId);
    formData.append('attachment-name', content.file.name);
    formData.append('attachment-description', content.descricao);
    formData.append('attachment-type', content.file.type);
    formData.append('content', content.file);

    return this.http.post<any>(`${environment.urlApi}/processo/api/upload/v1/task/${content.task.id}/attachment/create`, formData);
  }

  public downloadAnexo(key: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/upload/v1/task/download?key=${key}`, { responseType: 'blob' as 'json' });
  }

  public removerAnexo(taskId: any, documentId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/attachment/${documentId}`);
  }

  public removerVariavelInstance(instanceId: any, varName: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/v1/process-instance/${instanceId}/variables/${varName}`);
  }

  public carregarAnexo(taskId: any, documentId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/anexo/v1/task/${taskId}/attachment/${documentId}`, {
      responseType: 'blob' as 'json'
    });
  }
}
