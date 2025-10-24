import { DiaSemana } from "../../../shared/models/dia-semana.enum";

export interface Agenda{
  id: string;
  data: Date;
  dia: number;
  mes: number;
  ano: number;
  servico: string;
  horarios: Horario[];
}

export interface Horario{
  id: string;
  horario: Date;
  profissional: string;
  situacao: string;
  ativo: boolean;
  vagas: {livre: number, ocupadas: number}
}

export interface Configuracao{
  id: string;
  dataInicio: Date;
  dataFim: Date;
  horarioInicio: string;
  horarioFim: string;
  tipo: string;
  dias: number;
  intervalo: number;
  descanso: number;
  ignorarFeriados: boolean;
  ignorarFinalSemana: boolean;
  diasSemana: DiaSemana[];

}
