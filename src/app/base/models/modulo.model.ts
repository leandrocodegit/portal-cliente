import { MenuItem } from "primeng/api";

export interface Modulo {
  id: string;
  tipo: string;
  nome: string;
  descricaoCurta: string;
  descricaoDetalhada: string;
  versao: string;
  ativo: boolean;
  menu: Menu;
}

export interface Menu extends MenuItem {
  id?: string;
}
