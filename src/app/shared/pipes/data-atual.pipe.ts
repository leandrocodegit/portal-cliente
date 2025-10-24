import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInMonths, differenceInMinutes, differenceInSeconds, differenceInHours, subDays, subHours, subMinutes, subMonths } from 'date-fns';

@Pipe({
  name: 'anterior'
})
export class DataAnterirorPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    if(!value)
      return '- - -'
    return this.format(value);
  }

  public format(dataAlvo: Date): string {
  const agora = new Date();

  let restante = agora;

  const meses = differenceInMonths(restante, dataAlvo);
  restante = subMonths(restante, meses);

  const dias = differenceInDays(restante, dataAlvo);
  restante = subDays(restante, dias);

  const horas = differenceInHours(restante, dataAlvo);
  restante = subHours(restante, horas);

  const minutos = differenceInMinutes(restante, dataAlvo);

  const partes: string[] = [];

  if (meses > 0) {
      partes.push(`${meses} mês${meses !== 1 ? 'es' : ''}`);
      return partes.length > 0 ? partes.join(', ') : 'Agora mesmo';
    };
    if (dias > 0) {
      partes.push(`${dias} dia${dias !== 1 ? 's' : ''}`);
      return partes.length > 0 ? partes.join(', ') : 'Agora mesmo';
    };
    if (meses == 0 && dias == 0 && horas > 0) {
      partes.push(`${horas} hora${horas !== 1 ? 's' : ''}`);
      return partes.length > 0 ? partes.join(', ') : 'Agora mesmo';
    };
    if (meses == 0 && dias == 0 && minutos > 0) partes.push(`${minutos} minuto${minutos !== 1 ? 's' : ''}`);

  return partes.length > 0 ? partes.join(', ') : 'Agora mesmo';
  }




}
