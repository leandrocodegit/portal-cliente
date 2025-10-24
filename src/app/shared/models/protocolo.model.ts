export class Protocolo {
  id: string;
  protocolo: ProtocoloCliente;
  dataCriacao: Date;
  servicoId: string;
  deploymentId: string;
  descricaoServico: string;
  vencimento: Date;
  configuracaoProtocol: ConfiguracaoProtocolo;

  constructor(data: Partial<Protocolo> = {}) {
    this.id = data.id ?? '';
    this.protocolo = data.protocolo ?? new ProtocoloCliente;
    this.dataCriacao = data.dataCriacao ?? new Date;
    this.deploymentId = data.deploymentId ?? '';
    this.servicoId = data.servicoId ?? '';
    this.descricaoServico = data.descricaoServico ?? '';
    this.vencimento = data.vencimento ?? new Date;
    this.configuracaoProtocol = data.configuracaoProtocol ?? new ConfiguracaoProtocolo;
  }
}

export class ProtocoloCliente {
  numeroProtocolo: string;
  cliente: String;

  constructor(data: Partial<ProtocoloCliente> = {}) {
    this.numeroProtocolo = data.numeroProtocolo ?? '';
    this.cliente = data.cliente ?? '';
  }
}

export class ConfiguracaoProtocolo {
  id: string;
  prefixo: string;
  descricao: string;
  prioridade: number;

  constructor(data: Partial<ConfiguracaoProtocolo> = {}) {
    this.id = data.id ?? '';
    this.prefixo = data.prefixo ?? '';
    this.prioridade = data.prioridade ?? 0;
  }
}