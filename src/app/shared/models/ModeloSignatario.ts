import { PosicaoAssinatura } from "./PosicaoAssinatura";


export interface ModeloSignatario {
  id: string;                        // UUID
  descricao: string;
  processDefinitionId: string;
  processDefinitionKey: string;
  version: number;
  enabled: boolean;
  tenant: string;
  documentoModelo?: DocumentoModelo;
  grupo: string;
  posicoes: PosicaoAssinatura[];
}

export interface DocumentoModelo {
  id: string;                      // UUID
  nomeArquivo: string;
  descricao: string;
  type: string;
  path: string;
  enabled: boolean;
  tenant: string;
  modeloSignatarios?: ModeloSignatario[]; // opcional, lista de signatários
}
