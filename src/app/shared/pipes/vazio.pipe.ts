import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInMonths, differenceInMinutes, differenceInSeconds, differenceInHours, subDays, subHours, subMinutes, subMonths } from 'date-fns';

@Pipe({
  name: 'vazio'
})
export class voidPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(!value)
      return '- - -'
    return value;
  }

}
