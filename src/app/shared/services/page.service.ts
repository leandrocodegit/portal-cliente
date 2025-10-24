import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { __await } from 'tslib';
import { Page } from '../models/Page';


@Injectable({
  providedIn: 'root'
},
)
export class PageService {

  public initPageable(pageable: Page<any>){
    return { 
  }
  }

  public gerarParamsPage(page: any, sort?: any){
    let params = new URLSearchParams();

    if (page?.pageIndex != null) params.append("page", page.pageIndex.toString());
    if (page?.pageSize != null) params.append("size", page.pageSize.toString());
     
      if (sort) {
        params.append("sort", '${filtro.sort}');
      } 
  }
}
