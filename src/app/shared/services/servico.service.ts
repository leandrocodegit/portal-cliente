import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { Page } from 'src/app/shared/models/Page';
import { Servico } from '../models/servico.model';


@Injectable({
  providedIn: 'root'
},
)
export class ServicoService {


  constructor(
    private readonly http: HttpClient) { }


  public buscarServico(servicoId: any): Observable<Servico> {
    return this.http.get<Servico>(`${environment.urlApi}/protocolos/servico/${servicoId}`);
  }

  public listarServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${environment.urlApi}/protocolos/servico`);
  }

  public criarServico(servico: Servico): Observable<any> {
    return this.http.post<Servico>(`${environment.urlApi}/protocolos/servico`, servico);
  }

  public duplicarServico(servicoId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/protocolos/servico/duplicar/${servicoId}`, {});
  }

  public removerServico(servicoId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/protocolos/servico/${servicoId}`);
  }

  public habilitarServico(servicoId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/protocolos/servico/${servicoId}`, {});
  }
}
