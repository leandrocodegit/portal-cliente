import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInMonths, differenceInMinutes, differenceInSeconds, differenceInHours, subDays, subHours, subMinutes, subMonths } from 'date-fns';

@Pipe({
  name: 'proxima'
})
export class DataProximaVencimentoPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    if(!value)
      return false
    return this.format(value);
  }

  public format(dataAlvo: Date): boolean {
    const agora = new Date();

    if (dataAlvo <= agora) {
      return false;
    }

    let restante = dataAlvo;

    const meses = differenceInMonths(restante, agora);
    restante = subMonths(restante, meses);

    const dias = differenceInDays(restante, agora);
    restante = subDays(restante, dias);

    const horas = differenceInHours(restante, agora);
    restante = subHours(restante, horas);

    const minutos = differenceInMinutes(restante, agora);
    restante = subMinutes(restante, minutos);

    return meses == 0 && dias == 0 && (horas > 0 || minutos > 0);
  }
}
