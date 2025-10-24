export class Conector {
  id: string;
  nome: string;
  url: string;
  endpoint: string;
  metodo: string;
  prefixo: string;
  status: number;
  keys: string[];
  values: Map<string, any>;
  authId: string | null;
  varToken: string;
  build: ConectorBuild = new ConectorBuild;
  createUser: string;
  conectorAuth: boolean;
  enabled: boolean;

  constructor(init?: Partial<Conector>) {
    Object.assign(this, init ?? {});
  }
}

export class ConectorBuild {
  headers: Record<string, any>;
  params: Record<string, string>;
  pathVariables: Record<string, any> | null;
  payload: Record<string, any>;

  constructor(init?: Partial<Conector>) {
    Object.assign(this, init ?? {});
  }
}


