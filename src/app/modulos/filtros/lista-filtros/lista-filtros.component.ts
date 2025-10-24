import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FiltroService } from 'src/app/shared/services/filtro.service';

@Component({
  selector: 'app-lista-filtros',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent
  ],
  templateUrl: './lista-filtros.component.html',
  styleUrl: './lista-filtros.component.scss'
})
export class ListaFiltrosComponent implements OnInit {

  protected cols: any = [
    { header: 'Nome', field: 'name' },
    { header: 'Cor', field: 'properties', isVariavel: true, variavel: 'color', isColor: true },
     { header: 'Prioridade', field: 'properties', isVariavel: true, variavel: 'priority' },
    { header: 'Recurso', field: 'resourceType' },
    { header: 'Id', field: 'id' }
  ]

  protected itens: any[] = [];

  constructor(
    private readonly filterService: FiltroService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.listarFiltros();
  }

  listarFiltros() {
    this.filterService.listaFiltros().subscribe(response => {
      this.itens = response.sort((a, b) => a.properties.priority - b.properties.priority);
    })
  }

  editar($event: any) {
  }


  removerFiltro(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente remover esse filtro?',
      header: 'Confirmar ação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, remover',
      },
      accept: () => {
        this.filterService.removerFiltro(event).subscribe(() => {
          this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'Filtro foi removido' });
          this.listarFiltros();
        }, error => {

        })
      }
    });
  }

}
