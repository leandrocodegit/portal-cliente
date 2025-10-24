import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateServiceService {

  constructor() { }

  translate(template: string, replacements: any): string {
    const customTranslations:any = {
      'Change element': 'Alterar elemento',
      'End Event': 'Fim do evento',
      'Start Event': 'Inicio do evento',
      'Parallel Gateway': 'Paralelo',
      'Complex Gateway': 'Complexo',
      'Inclusive Gateway': 'Inclusive',
      'Event based Gateway': 'Evento',
      'Intermediate Throw Event': 'Evento intermediário',
      'Message Start Event': 'Message Start Event',
      'Timer Start Event': 'Evento de início do temporizador',
      'Conditional Start Event': 'Evento de Início Condicional',
      'Signal Start Event': 'Evento de início de sinal'
 


      // Add more translations as needed
    };

    return customTranslations[template] || template;
  }
}
