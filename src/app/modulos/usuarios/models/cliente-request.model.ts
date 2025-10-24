import { Endereco } from "./endereco.model";

export class ClienteRequest {
  id: string;
  nome: string;
  email: string;
  tipoPessoa: string;
  endereco: Endereco;
  modulos: string[];

  constructor(
    id = '',
    nome = '',
    email = '',
    tipoPessoa = '',
    endereco = new Endereco,
    modulos = []
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.tipoPessoa = tipoPessoa;
    this.endereco = endereco;
    this.modulos = modulos;
  }
}
