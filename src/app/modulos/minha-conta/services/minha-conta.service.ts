import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';
import { PaginatorState } from 'primeng/paginator';
import { Usuario } from '../../usuarios/models/usuario.model';
import { User } from '@/shared/models/User.model';


@Injectable({
  providedIn: 'root'
},
)
export class MinhaContaService {


  constructor(
    private readonly http: HttpClient) { }

  public meuHistorico(page: PaginatorState): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/conta/eventos?page=${page.page}&size=1000`);
  }

  public atualizarUsuario(user: any): Observable<any[]> {
    return this.http.put<any>(`${environment.urlApi}/conta`, user);
  }

  public buscarInfoUsuarioLogado(): Observable<User> {
    return this.http.get<User>(`${environment.urlApi}/conta`);
  }

  public alterarSenha(password: any): Observable<any[]> {
    return this.http.put<any>(`${environment.urlApi}/conta/password`, password);
  }

}
