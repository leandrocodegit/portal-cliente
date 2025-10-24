import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Job } from '../models/job.model';


@Injectable({
  providedIn: 'root'
},
)
export class JobService {


  constructor(private readonly http: HttpClient) { }

  public listaJobsInstancia(processInstanceId: any, active?: boolean): Observable<Job[]> {
    if (active)
      return this.http.get<Job[]>(`${environment.urlApi}/processo/api/v1/job?processInstanceId=${processInstanceId}&active=true`);
    return this.http.get<Job[]>(`${environment.urlApi}/processo/api/v1/job?processInstanceId=${processInstanceId}`);
  }

  public listaJobsPendentesInstancia(processInstanceId: any): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.urlApi}/processo/api/v1/job?processInstanceId=${processInstanceId}`);
  }

   public executarJob(jobId: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/processo/api/v1/job/${jobId}/execute`, {});
  }

}
