import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInMonths, differenceInMinutes, differenceInSeconds, differenceInHours, subDays, subHours, subMinutes, subMonths } from 'date-fns';

@Pipe({
  name: 'vencida'
})
export class DataVencidaPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    if(!value)
      return '- - -'
    return this.format(value);
  }

  public format(dataAlvo: Date): boolean {
    const agora = new Date();

    if (dataAlvo <= agora) {
      return true;
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

    const segundos = differenceInSeconds(restante, agora);

    const partes: string[] = [];

    if (meses > 0) partes.push(`${meses} mês${meses !== 1 ? 'es' : ''}`);
    if (dias > 0) partes.push(`${dias} dia${dias !== 1 ? 's' : ''}`);
    if (meses == 0 && dias == 0 && horas > 0) partes.push(`${horas} hora${horas !== 1 ? 's' : ''}`);
    if (meses == 0 && dias == 0 && minutos > 0) partes.push(`${minutos} minuto${minutos !== 1 ? 's' : ''}`);
 
    return !partes.length;
  }
}
