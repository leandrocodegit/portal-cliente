import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { __await } from 'tslib';


@Injectable({
  providedIn: 'root'
},
)
export class TabelaService {

  private search = new Subject<any>();
  private active = new Subject<any>();

  search$ = this.search.asObservable();
  active$ = this.active.asObservable();


  find(value: any) {
    this.search.next(value);
  }

  findActive(value: any) {
    this.active.next(value);
  }
}
