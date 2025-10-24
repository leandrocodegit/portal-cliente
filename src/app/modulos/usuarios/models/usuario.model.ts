import { DiaSemana } from "src/app/shared/models/dia-semana.enum";

export class Usuario {
  id: string;
  attributes: any | null;
  requiredActions: any | null;
  emailVerified: boolean;
  username: string;
  email: string;
  firstName: string;
  lastName: string | null;
  groups: Grupo[];
  departamentos: Grupo[];
  enabled: boolean;
  phone: any | null;
  controle_acesso: ControleAcesso = new ControleAcesso;
  tema: Tema;
  permissao: string
}

export class Grupo {
  id: string;
  name: string;
  description: string;
  nome: string
}

export class ControleAcesso {
  ativo: boolean = false;
  controlarDias: boolean = false;
  controlarHorario: boolean = false;
  dias: DiaSemana[] = [];
  inicio: string = "00:00";
  fim: string = "00:00";
  tolerancia: number = 15;
}

export class Tema {
  dark: boolean;
  color: string;
  toggle: boolean;
}
