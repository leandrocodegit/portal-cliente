import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CategoriaService } from '@/shared/services/categoria.service';
import { Categoria } from '@/shared/models/categoria.model';
import { FormularioModule } from '@/shared/modules/formulario.module';
import { VoltarSalvarComponent } from '@/shared/components/voltar-salvar/voltar-salvar.component';
import { SelectModule } from 'primeng/select';
import { PaginaServico } from '@/shared/models/pagina-servico.model';

@Component({
  selector: 'app-lista-categorias',
  imports: [
    FormularioModule,
    TituloPesquisaComponent,
    TabelaComponent,
    DialogModule,
    VoltarSalvarComponent
  ],
  templateUrl: './lista-categorias.component.html',
  styleUrl: './lista-categorias.component.scss'
})
export class ListaCategoriasComponent implements OnInit {

  @Input() select = false;
  @Output() selectEmit = new EventEmitter();
  @Input() categoria = new Categoria();
  protected cols: any = [
    { header: 'Nome', field: 'nome' }
  ];

  protected categoriaSelecionada: Categoria = new Categoria();
  protected categorias: any[] = [];
  protected visible = false;
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this.listaCategorias();
  }

  listaCategorias() {
    this.categoriaService.listarCategorias().subscribe(response => {
      this.categorias = response;
    });
  }

  remover(event: PaginaServico) {
    this.confirmationService.confirm({
      message: 'Deseja realmente remover essa categoria?',
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
        this.categoriaService.removerCategoria(event).subscribe(response => {
          this.listaCategorias();
        });
      }
    });
  }

  editar(event: Categoria) {
    this.categoriaSelecionada = event;
    this.visible = true;
  }

  salvar() {
    this.categoriaService.criarCategoria(this.categoria).subscribe(() => this.visible = false);
  }
}
