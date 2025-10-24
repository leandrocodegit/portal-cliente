import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';
import { PaginatorState } from 'primeng/paginator';
import { OAuthService } from 'angular-oauth2-oidc';
import { getCurrentAfterDate, getCurrentBeforeDate } from '@/shared/services/util/DateUtil';


@Injectable({
  providedIn: 'root'
},
)
export class AnexoService {


  constructor(
    private readonly http: HttpClient,
    private readonly oauthService: OAuthService) { }




}
