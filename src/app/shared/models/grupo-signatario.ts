export class GrupoSignatario {
  id: string;
  name: string;
  attributes: any;
  countUsers: number;
  countGrupos: number;
  gruposSelect: any[];
  usersSelect: any[];

  constructor(init?: Partial<GrupoSignatario>) {
    Object.assign(this, init);
  }
}

