import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { formatarData, getCurrentAfterDate, getCurrentBeforeDate } from '@/shared/services/util/DateUtil';
import { environment } from 'src/environments/environment.dev';
import { HistoricTask } from '../models/history-task.model';
import { Task } from '../models/task';
import { gerarVariaveisForm } from './util/formularioUtil';


@Injectable({
  providedIn: 'root'
},
)
export class TarefaService {

  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }

  public buscarTarefa(taskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}`);
  }

  public buscarIndentity(taskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/identity-links`);
  }

  public atribuirGrupoTarefa(taskId: any, identity: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/identity-links`, identity);
  }

  public removerGrupoTarefa(taskId: any, identity: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/identity-links/delete`, identity);
  }

  public buscarFormularopTarefa(taskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/deployed-form`);
  }

  public quantidadeTarefas(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/count`);
  }

  public quantidadeTarefasVencemHoje(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/count?dueBefore=${getCurrentBeforeDate()}&dueAfter=${getCurrentAfterDate()}`);
  }

  public removerTarefa(tarefaId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/v1/task/${tarefaId}`);
  }

  public assumirTarefa(task: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${task.taskId}/claim`, task);
  }

  public desassumirTarefa(taskId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/unclaim`, {});
  }

  public historicoTarefa(taskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/history/user-operation?taskId=${taskId}&sortBy=timestamp&sortOrder=desc`);
  }

  public comentariosTarefa(taskId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/comment`);
  }

  public criarComentariosTarefa(taskId: any, comentario: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/comment/create`, comentario);
  }

  public criarTarefa(task: Task): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/create`, task);
  }

  public atualizarTarefa(task: Task): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/processo/api/v1/task/${task.id}`, task);
  }

  public delegarTarefa(taskId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/delegate`, {
      userId: userId
    });
  }

  public atualizarComentariosTarefa(taskId: any, comentario: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/comment`, comentario);
  }

  public removerComentariosTarefa(taskId: any, comentarioId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/comment/${comentarioId}`);
  }

  public salvarTarefa(tarefa: Task): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/processo/api/v1/task/${tarefa.id}`, this.limparExtras(tarefa));
  }

  public incluirVarivalLocalTarefa(form: any): Observable<any> {

    const headers = {
      headers: new HttpHeaders({
        'content-type': 'multipart/form-data'
      })
    }

    const formData = new FormData();
    formData.append('data', form.value);
    formData.append('valueType', form.type);
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/task/${form.taskId}/localVariables/${form.varName}/data`, formData, headers);
  }

  public incluirVarivalLocalTextoTarefa(taskId: any, varName: any, variavel: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/processo/api/v1/task/${taskId}/localVariables/${varName}`, variavel);
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

  public listaVariaveisInstancia(instanceId: any, taskId?: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/variable-instance?processInstanceIdIn=${instanceId}`);
  }

  public buscarTasksInstanciaAtiva(instanceId: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.urlApi}/processo/api/v1/task?processInstanceId=${instanceId}&unassigned=false&active=false&suspended=false`);
  }

  limparExtras<T>(obj: any): T {
    const novo: any = {};
    for (const key in obj) {
      if (key in obj) {
        if (key != 'camundaFormRef')
          novo[key] = obj[key];
      }
    }
    return novo as T;
  }

}
