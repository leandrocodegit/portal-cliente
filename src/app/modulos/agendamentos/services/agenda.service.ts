import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { Configuracao } from '../models/agenda.model';
import { environment } from '../../../../environments/environment.dev';
import { Page } from '../../../shared/models/Page';


@Injectable({
  providedIn: 'root'
},
)
export class AgendaService {


  constructor(
    private readonly http: HttpClient) { }

  public buscarConfiguracao(): Observable<Page<Configuracao>> {
    return this.http.get<any>(`${environment.urlApi}/agenda/configuracao`);
  }

  public salvarConfiguracao(configuracao: Configuracao): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/agenda/configuracao`, configuracao);
  }
}
