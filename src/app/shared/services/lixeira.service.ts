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
export class LixeiraService {


  constructor(private readonly http: HttpClient) { }


  public listaLixeiras(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/processo/api/v1/simod-rest/base/lixeira`);
  }

  public removerDepartamento(groupId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/usuario/grupos/departamento/${groupId}`);
  }

}
