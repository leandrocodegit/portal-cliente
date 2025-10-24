import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class DateParseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
if(req.url.includes('agenda'))
  return next.handle(req);
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: this.convertDates(event.body) });
        }
        return event;
      })
    );
  }

  private convertDates(body: any): any {

    if (body === null || body === undefined) return body;

    if (typeof body === 'string' && this.isLocalDateTime(body)) {
      return new Date(body.split('.')[0]);
    }

    if (Array.isArray(body)) {
      return body.map(value => this.convertDates(value));
    }

    if (typeof body === 'object') {
      const convertedObj: any = {};
      for (const key of Object.keys(body)) {
        convertedObj[key] = this.convertDates(body[key]);
      }
      return convertedObj;
    }

    return body;
  }

  private isLocalDateTime(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/.test(value);
  }
}
