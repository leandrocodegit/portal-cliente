import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { Categoria } from '../models/categoria.model';


@Injectable({
  providedIn: 'root'
},
)
export class CategoriaService {


  constructor(
    private readonly http: HttpClient) { }


  public buscarCategoria(categoriaId: any): Observable<Categoria> {
    return this.http.get<Categoria>(`${environment.urlApi}/protocolos/categoria/${categoriaId}`);
  }

  public listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.urlApi}/protocolos/categoria`);
  }

  public criarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${environment.urlApi}/protocolos/categoria`, categoria);
  }

  public removerCategoria(categoriaId: any): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/protocolos/categoria/${categoriaId}`);
  }
}
