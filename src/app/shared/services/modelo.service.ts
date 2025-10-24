import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { OAuthService } from 'angular-oauth2-oidc';
import { ModeloSignatario } from '../models/ModeloSignatario';


@Injectable({
  providedIn: 'root'
},
)
export class ModeloService {


  constructor(
    private readonly http: HttpClient) { }


  public buscarModelo(modeloId: any): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/modelos/${modeloId}`);
  }

  public buscarModeloSignatarios(modeloId: any): Observable<ModeloSignatario> {
    return this.http.get<ModeloSignatario>(`${environment.urlApi}/modelos/signatario/${modeloId}`);
  }

  public downloadModelo(modeloId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/modelos/download/${modeloId}`, { responseType: 'blob' as 'json' });
  }

  public dataModelo(modeloId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/modelos/data/${modeloId}`);
  }

  public getbas64(modeloId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/modelos/view/${modeloId}`);
  }

  public listaModelos(): Observable<any[]> {
    return this.http.get<any>(`${environment.urlApi}/modelos?size=${20}`);
  }

  public listaModelosSignatarios(): Observable<ModeloSignatario[]> {
    return this.http.get<ModeloSignatario[]>(`${environment.urlApi}/modelos/signatario?size=${20}`);
  }

  public removerModelo(modeloId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/modelos/${modeloId}`);
  }

    public removerModeloSignatario(modeloId: any): Observable<any[]> {
    return this.http.delete<any>(`${environment.urlApi}/modelos/signatario/${modeloId}`);
  }

  public ativarModelo(modeloId: any): Observable<any[]> {
    return this.http.post<any>(`${environment.urlApi}/modelos/ativar/${modeloId}`, {});
  }

  public salvarModelo(modelo: any, file: File): Observable<any> {
    var form = new FormData;
    form.append('descricao', modelo.descricao);
    if (modelo.id)
      form.append('id', modelo.id);
    if (file)
      form.append('arquivo', file);
    return this.http.post<any>(`${environment.urlApi}/modelos/upload`, form);
  }

  public salvarModeloSignatario(modelo: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/modelos/signatario`, modelo);
  }

   public salvarRubricas(modelo: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/modelos/signatario/rubricas`, modelo);
  }

}
