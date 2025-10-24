export enum DiaSemana {
  SEG = 'SEG',
  TER = 'TER',
  QUA = 'QUA',
  QUI = 'QUI',
  SEX = 'SEX',
  SAB = 'SAB',
  DOM = 'DOM'
}

export const DiasDescriptions: Record<DiaSemana, string> = {
  [DiaSemana.SEG]: 'Segunda',
  [DiaSemana.TER]: 'Terça',
  [DiaSemana.QUA]: 'Quarta',
  [DiaSemana.QUI]: 'Quinta',
  [DiaSemana.SEX]: 'Sexta',
  [DiaSemana.SAB]: 'Sábado',
  [DiaSemana.DOM]: 'Domingo',
};

