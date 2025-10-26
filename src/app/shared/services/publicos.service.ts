import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { PaginaServico } from '../models/pagina-servico.model';
import { gerarDataForm, gerarVariaveisForm } from './util/formularioUtil';
import { Servico } from '../models/servico.model';


@Injectable({
  providedIn: 'root'
},
)
export class PublicoService {


  constructor(
    private readonly http: HttpClient) { }

  public listaPaginasPublicas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/publico/pagina`);
  }

  public listaServicosPublicos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/publico/servico`);
  }

  public buscarPaginaServico(paginaId: any): Observable<PaginaServico> {
    return this.http.get<PaginaServico>(`${environment.urlApi}/publico/pagina/${paginaId}`);
  }

  public buscarFormulario(id: any, ultimaVersao?: boolean): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/publico/formulario/${id}?ultimaVersao=${ultimaVersao ?? false}`);
  }

  public buscarTarefa(taskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}`);
  }

  public buscarServico(servicoId: any): Observable<Servico> {
    return this.http.get<Servico>(`${environment.urlApi}/publico/servico/${servicoId}`);
  }

  public resolveTarefa(task: any, data: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${task.id}/resolve`, { variables: gerarVariaveisForm(task, data) });
  }

  public comcluirTarefa(taskId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/complete`, {});
  }

  public listaFormulariosTarefaAdicional(taskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/variables/formularios-adicionais?deserializeValue=true`, {});
  }

  public listaVariaveis(taskId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/task/${taskId}/form-variables`, {});
  }

  public anexarDocumentoFormulario(task: any, data: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/upload/v1/task/${task.id}/forms/create?processInstanceId=${task.caseInstanceId}`, gerarDataForm(data));
  }


  public gerarProtocoloFormulario(servicoId: any, data: any): Observable<any> {

    const formData = new FormData();

    for (const key in data.data) {
      const value = data.data[key];

      if (typeof value === 'string' && value.startsWith("files::")) {
        const file = data.files.get(value);
        if (file) {
          formData.append(key, file[0]);
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
    return this.http.post<any>(`${environment.urlApi}/publico/form/${servicoId}`, gerarDataForm(data));
  }


}
