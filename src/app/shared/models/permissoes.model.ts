export class Permissao {
  id: string;
  nome: string;
  processId: string;
  grupos: GrupoPermissao[];
  users: UserPermissao[];
  countUsers: number;
  countGrupos: number;
  gruposSelect: any[];
  usersSelect: any[];

  constructor(init?: Partial<Permissao>) {
    Object.assign(this, init);
  }
}

export class GrupoPermissao {
  grupo: string; 

  constructor(init?: Partial<Permissao>) {
    Object.assign(this, init);
  }
}

export class UserPermissao {
  userId: string; 
  
  constructor(init?: Partial<Permissao>) {
    Object.assign(this, init);
  }
}
