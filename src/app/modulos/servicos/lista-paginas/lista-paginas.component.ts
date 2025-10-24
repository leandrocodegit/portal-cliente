import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
 import { PaginaService } from '@/shared/services/pagina.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormularioPaginasComponent } from '../formulario-paginas/formulario-paginas.component';
import { PaginaServico } from '@/shared/models/pagina-servico.model';

@Component({
  selector: 'app-lista-paginas',
  imports: [
    TituloPesquisaComponent,
    TabelaComponent,
    DialogModule,
    FormularioPaginasComponent
  ],
  templateUrl: './lista-paginas.component.html',
  styleUrl: './lista-paginas.component.scss'
})
export class ListaPaginasComponent implements OnInit {

  protected colsPagina: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Serviços', field: 'quantidadeServicos' },
    { header: 'Publico', field: 'publico', isTag: true },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Url', field: 'host', isCopy: true, isRedirect: true },
    { header: 'Redirecionamento', field: 'redirect',  isRedirect: true }
  ];

  protected paginaSelecionada: PaginaServico = new PaginaServico();
  protected paginas: any[] = [];
  protected visible = false;
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  constructor(
    private readonly paginaService: PaginaService,
    private readonly confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this.listaPaginas();
  }

  listaPaginas() {
    this.paginaService.listarPaginas().subscribe(response => {
      this.paginas = response;
      this.paginas.forEach(pagina => {
        pagina.host = `${window.location.origin}/embedded/servicos/${pagina.id}`
      })
    });
  }

  duplicarPagina(event: PaginaServico) {
    this.paginaService.duplicarPagina(event).subscribe(response => {
      this.listaPaginas();
    });
  }

  removerPagina(event: PaginaServico) {
    this.confirmationService.confirm({
      message: 'Deseja realmente remover essa pagina?',
      header: 'Confirmar ação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, remover',
      },
      accept: () => {
        this.paginaService.removerPagina(event).subscribe(response => {
          this.listaPaginas();
        });
      }
    });
  }

  editarPagina(event: PaginaServico) {
    this.paginaSelecionada = event;
    this.visible = true;
  }

  lock(event: PaginaServico) {
    this.paginaService.habilitarPagina(event.id).subscribe(response => {
      var pagina = this.paginas.find(serv => serv.id == event.id);
      if (pagina)
        pagina.enabled = !pagina.enabled;
    });
  }
}
