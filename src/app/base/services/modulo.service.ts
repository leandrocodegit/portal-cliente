import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { Modulo } from '../models/modulo.model';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
},
)
export class ModuloService {


  constructor(
    private readonly http: HttpClient) { }

  public listaModulo(): Observable<Modulo[]> {
    return this.http.get<any>(`${environment.urlApi}/modulos`)
  }

  public salvarModulo(modulo: Modulo): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/modulos`, modulo)
  }
}
