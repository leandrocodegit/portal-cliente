import { Component } from '@angular/core';
import { ListaFormularioProtocoloComponent } from 'src/app/modulos/servicos/lista-formulario-protocolo/lista-formulario-protocolo.component';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';


@Component({
  selector: 'app-lista-decisoes',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent
  ],
  templateUrl: './lista-decisoes.component.html',
  styleUrl: './lista-decisoes.component.scss'
})
export class ListaDecisoesComponent extends ListaFormularioProtocoloComponent {

   protected cols: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Descrição', field: 'descricao' },
    { header: 'Status', field: 'status' },
    { header: 'Ativo', field: 'enabled' }
  ]

  protected itens: any[] = [];

  editar($event: any) {
  }

  removerProcesso(event: any) {

  }

  lock($event: any) {
  }

}
