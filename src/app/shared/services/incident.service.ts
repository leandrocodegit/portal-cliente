import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Incident } from '../models/incident.model';


@Injectable({
  providedIn: 'root'
},
)
export class IncidentService {


  constructor(private readonly http: HttpClient) { }


  public listaIncidentesInstancia(processInstanceId: any): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${environment.urlApi}/processo/api/v1/incident?processInstanceId=${processInstanceId}`);
  }

  public quantidadeIncidentesAbertasInstancia(processInstanceId: string, activityId: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${environment.urlApi}/processo/api/v1/incident/count?processInstanceId=${processInstanceId}&activityId=${activityId}&open=true`);
  }

}
