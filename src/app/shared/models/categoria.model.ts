export class Categoria {
  id: string;
  nome: string;

  constructor(data: Partial<Categoria> = {}) {
    this.id = data.id ?? '';
    this.nome = data.nome ?? '';
  }
}
