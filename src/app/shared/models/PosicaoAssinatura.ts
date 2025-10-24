export interface PosicaoAssinatura {
  id: string;
  externalId: string;
  descricao: string;
  color: string;
  nome: string;
  tipoSignatario: TipoSignatario;
  email: string;
  type: string;
  enabled: boolean;
  ordem: number;
  rubricas: Rubrica[];
  preferenciasSignatario: Preferencias
}

export interface Rubrica {
  id?: string;
  page: number;
  page_height: number;
  page_width: number;
  height: number;
  width: number;
  position_left: number;
  position_top: number;
  position_x: number;
  position_y: number;
}

export class Preferencias {
  id?: string;
  act: any;
  assinatura_presencial: boolean;
  certificadoicpbr: boolean;
  docauth: boolean;
  docauthandselfie: boolean;
  auth_pix: boolean;
  videoselfie: boolean;
  certificadoicpbr_cpf: any;
  certificadoicpbr_tipo: any;

  constructor(data?: Partial<Preferencias>) {
    this.id = data?.id;
    this.act = data?.act ?? '1';
    this.assinatura_presencial = data?.assinatura_presencial ?? false;
    this.certificadoicpbr = data?.certificadoicpbr ?? false;
    this.docauth = data?.docauth ?? false;
    this.docauthandselfie = data?.docauthandselfie ?? false;
    this.videoselfie = data?.videoselfie ?? false;
    this.certificadoicpbr_cpf = data?.certificadoicpbr_cpf ?? '';
    this.certificadoicpbr_tipo = data?.certificadoicpbr_tipo ?? '1';
  }
}

export enum TipoSignatario {
  GRUPO = 'GRUPO',
  USER = 'USER',
  TASK = 'TASK',
  EXTRA = 'EXTRA'
}
