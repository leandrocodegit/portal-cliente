
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { Categoria } from '@/shared/models/categoria.model';
import { FiltroCategoriasComponent } from '../filtro-categorias/filtro-categorias.component';
@Component({
  selector: 'app-grid-servicos',
  imports: [
    FormsModule,
    ButtonModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    InputText,
    CommonModule,
    AutoCompleteModule,
    SelectModule,
    FiltroCategoriasComponent
  ],
  templateUrl: './grid-servicos.component.html',
  styleUrl: './grid-servicos.component.scss'
})
export class GridServicosComponent {

  @Input() servicos: any[] = [];
  @Input() categorias: any[] = [];
  @Input() servicosFiltro: any[] = [];
  @Output() solicitarEmit = new EventEmitter();
  protected categoria: Categoria = new Categoria();
  protected selectedCountryAdvanced: any[] | undefined;
  protected filteredServicos: any[] | undefined;

  constructor(
    private filterService: FilterService,
    private readonly router: Router) { }

  iniciarServico(servico: any) {
    this.solicitarEmit.emit(servico);
   // this.router.navigate([`painel/servico/${servico.id}/${servico.formKey}`]);
  }

  filtrar(event: any) {
    const termo = event.toLowerCase();

    this.servicosFiltro = this.servicos.filter(item => {
      const correspondeCategoria = this.categoria
        ? this.filterService.filters['equals'](item?.categoria?.nome?.toLowerCase() ?? '', this.categoria)
        : true;

      const correspondeTexto =
        this.filterService.filters['contains'](item?.nome?.toLowerCase() ?? '', termo) ||
        this.filterService.filters['contains'](item?.descricao?.toLowerCase() ?? '', termo);

      return correspondeCategoria && correspondeTexto;
    });
  }
}
