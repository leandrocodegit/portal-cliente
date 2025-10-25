import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { Page } from 'src/app/shared/models/Page';


@Injectable({
  providedIn: 'root'
},
)
export class AutorProtocoloService {


  constructor(
    private readonly http: HttpClient) { }

  public buscarProtocolo(protocolo: any): Observable<any> {
    return this.http.get<Page<any>>(`${environment.urlApi}/autor-protocolo/${protocolo}`);
  }

  public listarProtocolos(): Observable<Page<any>> {
    return this.http.get<Page<any>>(`${environment.urlApi}/autor-protocolo?sort=dataCriacao,desc`);
  }

}
