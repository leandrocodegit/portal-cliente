import { Categoria } from "./categoria.model";
import { ConfiguracaoProtocolo } from "./protocolo.model";

export class Servico {
  id: string;
  nome: string;
  processId: string;
  publico: boolean;
  descricao: string;
  enabled: boolean;
  version: string;
  prazo: number;
  configuracaoProtocolo: ConfiguracaoProtocolo;
  categoria: Categoria

  constructor(data: Partial<Servico> = {}) {
    this.id = data.id ?? '';
    this.nome = data.nome ?? '';
    this.processId = data.processId ?? '';
    this.publico = data.publico ?? false;
    this.descricao = data.descricao ?? '';
    this.enabled = data.enabled ?? false;
    this.version = data.version ?? '';
    this.prazo = data.prazo ?? 0;
    this.configuracaoProtocolo = data.configuracaoProtocolo ?? new ConfiguracaoProtocolo;
    this.categoria = data.categoria ?? new Categoria;
  }
}
