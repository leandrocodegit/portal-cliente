import { Component, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MinhaContaService } from 'src/app/modulos/minha-conta/services/minha-conta.service';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';

@Component({
  selector: 'app-historico',
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    TabelaComponent,
    SelectModule,
    TituloCurtoComponent
  ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent implements OnInit {

  balanceFrozen: boolean = false;
  profissionais: any[] = [];
  protected cols: any = [
    { header: 'Sessão', field: 'sessionId' },
    { header: 'Data evento', field: 'time' },
    { header: 'Tipo do evento', field: 'type' },
    { header: 'Endereço ip', field: 'ipAddress' }
  ]
  protected itens: any[] = [];
  protected size: number = 10;
  protected options = [
    { label: 10, value: 10 },
    { label: 50, value: 50 },
    { label: 100, value: 100 }
  ];
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  constructor(
    private usuarioService: MinhaContaService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.listarHistorico(this.pagina)
  }

  onPageChange(event: PaginatorState) {
    this.pagina.first = event.first;
    //   this.listarHistorico(event);
  }
  protected listarHistorico(page: PaginatorState) {
     this.usuarioService.meuHistorico(page).subscribe(response => {
      this.itens = response;
    }) 
  }

  atualizaLista() {
    this.pagina.page = 0;
    this.pagina.first = 0;
    this.listarHistorico(this.pagina);
  }

  getTotal() {
    if (!this.itens?.length)
      return this.pagina.rows;
    return this.pagina.rows + 1;
  }

  editar(id: any) {
    this.router.navigate([`/${id}`])
  }
}

