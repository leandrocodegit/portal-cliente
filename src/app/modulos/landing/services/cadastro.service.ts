import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';
import { Page } from '../../../shared/models/Page';
import { ClienteRequest } from '../../usuarios/models/cliente-request.model';


@Injectable({
  providedIn: 'root'
},
)
export class CadastroClienteService {


  constructor(
    private readonly http: HttpClient) { }

  public criarCliente(request: ClienteRequest): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/cliente`, request);
  }
}
