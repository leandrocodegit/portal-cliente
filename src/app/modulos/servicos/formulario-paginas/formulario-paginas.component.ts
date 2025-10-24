import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloCurtoComponent } from '@/shared/components/titulo-curto/titulo-curto.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { VoltarSalvarComponent } from '@/shared/components/voltar-salvar/voltar-salvar.component';
import { PaginaServico } from '@/shared/models/pagina-servico.model';
import { FormularioModule } from '@/shared/modules/formulario.module';
import { PaginaService } from '@/shared/services/pagina.service';
import { ServicoService } from '@/shared/services/servico.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-formulario-paginas',
  imports: [
    FormularioModule,
    TituloCurtoComponent,
    VoltarSalvarComponent,
    CheckboxModule,
    DialogModule,
    TabelaComponent,
    TituloPesquisaComponent
  ],
  templateUrl: './formulario-paginas.component.html',
  styleUrl: './formulario-paginas.component.scss'
})
export class FormularioPaginasComponent implements OnInit {

  @Output() voltarEmit = new EventEmitter();
  @Input() paginaServico = new PaginaServico();
  protected servicos: any[] = [];
  protected viewServicos = false;
  protected cols: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Processo', field: 'processId' },
    { header: 'Versão', field: 'version' },
    { header: 'Publico', field: 'publico' },
    { header: 'Ativo', field: 'enabled' }
  ];
  protected page = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  constructor(
    private readonly paginaService: PaginaService,
    private readonly servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    this.listaServicos();
  }

  salvar() {
    this.paginaService.criarPagina(this.paginaServico).subscribe(() => {
      this.voltarEmit.emit();
    }, error => {
      this.paginaServico.id = undefined;
    });
  }

  listaServicos() {
    this.servicoService.listarServicos().subscribe(response => {
      this.servicos = response;
      this.servicos.forEach(servico => {
        servico.select = !!this.paginaServico.servicos.find(servicoPagina => servicoPagina.id == servico.id)
      })
    });
  }

  adicionarValue(event: any) {
    event.select = !event.select;
    this.paginaServico.servicos = this.servicos.filter(servico => servico.select);
  }
}
