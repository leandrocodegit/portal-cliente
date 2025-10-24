import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TabelaService } from '../tabela/tabela.service';
import { Location } from '@angular/common';
import { LayoutService } from '@/base/services/layout.service';
import { TooltipModule } from 'primeng/tooltip';
import { ImprimirComponent } from '../imprimir/imprimir.component';

@Component({
  selector: 'app-titulo-pesquisa',
  imports: [
    FormsModule,
    ButtonModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterModule,
    TooltipModule,
    ImprimirComponent
  ],
  templateUrl: './titulo-pesquisa.component.html',
  styleUrl: './titulo-pesquisa.component.scss'
})
export class TituloPesquisaComponent {

  @Output() searchEmit = new EventEmitter();
  @Output() customEmit = new EventEmitter();
  @Output() adicionalEmit = new EventEmitter();
  @Output() ativosEmit = new EventEmitter();
  @Output() customAdd = new EventEmitter();
  @Output() printEmit = new EventEmitter();
  @Input() ativos = false;
  @Input() value: any;

  protected isMobile = false;

  constructor(
    private readonly tabelaService: TabelaService,
    private readonly location: Location,
    private layoutService: LayoutService
  ) {
    this.isMobile = layoutService.isMobile();
  }

  pesquisar(value: any) {
    this.tabelaService.find(value);
  }

  filtrarAtivos() {
    this.tabelaService.findActive(this.ativos);
  }

  customEvent() {
    this.customEmit.emit();
  }

  voltar() {
    this.location.back();
  }
}
