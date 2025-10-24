import { GridServicosComponent } from '@/shared/components/grid-servicos/grid-servicos.component';
import { ICONS } from '@/shared/models/icons';
import { CategoriaService } from '@/shared/services/categoria.service';
import { ServicoService } from '@/shared/services/servico.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-solicitacao-servico',
  imports: [
    GridServicosComponent
  ],
  templateUrl: './painel-solicitacao-servico.component.html',
  styleUrl: './painel-solicitacao-servico.component.scss'
})
export class PainelSolicitacaoServicoComponent {

  protected icons = ICONS;
  protected servicos: any[] = [];
  protected categorias: any[] = [];
  protected servicosFiltro: any[] = [];
  protected selectedCountryAdvanced: any[] | undefined;
  protected filteredServicos: any[] | undefined;

  constructor(
    private readonly servicoService: ServicoService,
    private readonly categoriaService: CategoriaService,
    private readonly router: Router) { }


  ngOnInit(): void {
    this.listaServicos();
    this.listaCategorias();
  }

  listaServicos() {
    this.servicoService.listarServicos().subscribe(response => {
      this.servicos = response;
    });
  }

  listaCategorias() {
    this.categoriaService.listarCategorias().subscribe(response => {
      this.categorias = response.map(categoria => categoria.nome);
    });
  }

  iniciarServico(servico: any) {
    this.router.navigate([`painel/servico/${servico.id}/${servico.formKey}`]);
  }
}
