import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { ResourceDeployment } from '../models/resource-deployment.model';
import { Deployment } from '../models/deployment.model';


@Injectable({
  providedIn: 'root'
},
)
export class DeployService {

  constructor(private readonly http: HttpClient) { }

  public buscarDeployment(deploymentId: any): Observable<Deployment> {
    return this.http.get<Deployment>(`${environment.urlApi}/processo/api/v1/deployment/${deploymentId}`);
  }
  public listaDeployments(deploymentId: any): Observable<Deployment[]> {
    return this.http.get<Deployment[]>(`${environment.urlApi}/processo/api/v1/deployment`);
  }

  public listaResources(deploymentId: any): Observable<ResourceDeployment[]> {
    return this.http.get<ResourceDeployment[]>(`${environment.urlApi}/processo/api/v1/deployment/${deploymentId}/resources`);
  }

  public buscarResourData(deploymentId: any, resourceId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/processo/api/download/v1/deployment/${deploymentId}/resources/${resourceId}/data`);
  }
}
