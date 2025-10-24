

export class Endereco {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  complemento: string;
  numero: string;

  constructor(
    cep = '',
    state = '',
    city = '',
    neighborhood = '',
    street = '',
    complemento = '',
    numero = ''
  ) {
    this.cep = cep;
    this.state = state;
    this.city = city;
    this.neighborhood = neighborhood;
    this.street = street;
    this.complemento = complemento;
    this.numero = numero;
  }
}
