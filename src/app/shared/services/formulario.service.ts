import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable, Subject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
},
)
export class FormularioService {

  public reload = new EventEmitter<any>();

  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }

  public buscarFormulario(id: any, ultimaVersao?: boolean): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/formulario/${id}?ultimaVersao=${ultimaVersao ?? false}`);
  }

  public salvarFormulario(formulario: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/formulario`, formulario);
  }

  public salvarSchema(formulario: any, tipo, versionar?: boolean): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/formulario/${tipo}?versionar=${versionar ?? false}`, formulario);
  }

  public habilitarFormulario(id: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/formulario/${id}`, {});
  }

  public listaFormularios(tipo: string, incluirVersoes?: boolean): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/formulario?tipoFormulario=${tipo}&incluirVersoes=${incluirVersoes ?? false}`);
  }

  public listaVersoesFormularios(idVersao: string, incluirPrincipal?: boolean): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/formulario/versao/${idVersao}?incluirPrincipal=${incluirPrincipal ?? false}`);
  }

  public removerFormulario(id: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/formulario/${id}`);
  }

}
