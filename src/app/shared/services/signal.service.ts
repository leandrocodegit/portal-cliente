import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Permissao } from '../models/permissoes.model';


@Injectable({
  providedIn: 'root'
},
)
export class SignalService {


  constructor(private readonly http: HttpClient) { }


  public publicarMensagem(instanceId: any, nomeMensagem: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/message`, {
      messageName: nomeMensagem,
      processInstanceId: instanceId,
      withoutTenantId: false,

    });
  }

  public publicarSignal(instanceId: any, nomeMensagem: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/signal`, {
      messageName: nomeMensagem,
      processInstanceId: instanceId,
      withoutTenantId: false,
    });
  }

  public listarSinais(processId: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/simod-rest/base/sinais/${processId}`);
  }

}
