import { Servico } from "./servico.model";

export class PaginaServico {
  id: string;
  nome: string;
  servicos: Servico[];
  publico: boolean;
  enabled: boolean;
  redirect: string;
  quantidadeServicos: number;
  categorias: String[]

  constructor(data: Partial<PaginaServico> = {}) {
    this.id = data.id ?? '';
    this.nome = data.nome ?? '';
    this.servicos = data.servicos ?? [];
    this.publico = data.publico ?? false;
    this.redirect = data.redirect ?? '';
    this.enabled = data.enabled ?? false;
    this.quantidadeServicos = data.quantidadeServicos ?? 0;
  }
}
