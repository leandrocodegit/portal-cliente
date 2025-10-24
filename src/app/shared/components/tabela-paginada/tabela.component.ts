import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { TabelaService } from '../tabela/tabela.service';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TooltipModule } from 'primeng/tooltip';
import { NumeroProtocoloComponent } from '../numero-protocolo/numero-protocolo.component';
import { IdentityService } from '@/shared/services/identity.service';


@Component({
  selector: 'app-tabela-paginada',
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    FormsModule,
    TagModule,
    SelectModule,
    PopoverModule,
    MessageModule,
    ButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    DatePipe,
    ClipboardModule,
    TooltipModule,
    NumeroProtocoloComponent
  ],
  templateUrl: './tabela-paginada.component.html'
})
export class TabelaPagindaComponent implements OnInit, OnDestroy {

  @Input() itens!: any[];

  @Input() cols: any[] = [];
  @Output() editarEmit = new EventEmitter();
  @Output() excluirEmit = new EventEmitter();
  @Output() visualizarEmit = new EventEmitter();
  @Output() pageEmit = new EventEmitter();
  @Output() logoutEmit = new EventEmitter();
  @Output() lockEmit = new EventEmitter();
  @Output() refreshEmit = new EventEmitter();
  @Output() configEmit = new EventEmitter();
  @Output() stopEmit = new EventEmitter();
  @Output() downloadEmit = new EventEmitter();
  @Output() detalhesEmit = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() sortEmit = new EventEmitter();

  @Input() view: any;
  @Input() page: any;
  @Input() totalElements?: any;

  @ViewChild('tabela') tabela: Table;

  protected ELEMENT_DATA: any[] = [
    { numeroProtocolo: 1, dataCriacao: 'Hydrogen', weight: 1.0079, descricaoServico: 'H' }
  ];

  displayedColumns: string[] = ['numeroProtocolo', 'dataCriacao', 'weight', 'descricaoServico'];
  dataSource = this.ELEMENT_DATA;

  protected active = false;
  protected pesquisa = '';
  protected first?: number;
  protected rows?: number;
  protected sort?: Sort;
  protected sessoesUsuario: any[] = [];
  private searchSubscription!: Subscription;
  private activeSubscription!: Subscription;

  constructor(
    private readonly tabelaService: TabelaService,
    public readonly identityService: IdentityService
  ) {


    this.activeSubscription = tabelaService.active$.subscribe(value => {
      if (value) {
        this.tabela.filters['enabled'] = { value: value, matchMode: 'equals' };
      } else {
        delete this.tabela.filters['enabled'];
      }

      this.tabela._filter();
      if (this.pesquisa != '')
        this.tabela.filterGlobal(this.pesquisa, 'contains');

      this.active = value;
    })

    this.searchSubscription = tabelaService.search$.subscribe(value => {
      this.pesquisa = value;
      if (this.active) {
        this.tabela.filters['enabled'] = { value: this.active, matchMode: 'equals' };
        this.tabela._filter();
      }
      this.tabela.filterGlobal(value, 'contains');

    })
  }

  colunas() {
    return this.cols.map(col => col.field);
  }

  ngOnInit(): void {
    if (!this.cols.find(col => col.header == 'icon'))
      this.cols.push({
        header: 'icon',
        field: 'icon'
      });

    if (this.totalElements)
      this.page.totalElements = this.totalElements;
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  sortData(event: any) {
    this.sort = event;
    this.page.number = 0;
    this.emitePage();
  }

  onPageChange(event: any) {
    this.page.size = event.pageSize;
    this.page.number = event.pageIndex;
    this.emitePage();
  }

  private emitePage() {
    this.pageEmit.emit(
      {
        spring: `?size=${this.page?.size ?? 10}&page=${this.page?.number ?? 0}${this.sort ? `&sort=${this.sort?.active},${this.sort?.direction ?? 'asc'}` : ''}`,
        camunda: `maxResults=${this.page?.size ?? 10}&firstResult=${this.getFirst()}${this.sort ? `&sortBy=${this.sort?.active}${this.sort?.direction ? '&sortOrder=' + this.sort?.direction : '&sortOrder=asc'}` : ''}`
      });
  }

  getFirst() {
    if (this.page?.number == 0)
      return 0;
    return this.page?.number * this.page?.size;
  }

  editar(id: any) {
    this.editarEmit.emit(id);
  }

  excluir(id: any) {
    this.excluirEmit.emit(id);
  }

  refresh(id: any, name: any) {
    this.refreshEmit.emit({
      id: id,
      name: name
    });
  }

  visualizar(value: any) {
    this.visualizarEmit.emit(value);
  }

  lock(value: any) {
    this.lockEmit.emit(value);
  }

  config(value: any) {
    this.configEmit.emit(value);
  }

  stop(value: any) {
    this.stopEmit.emit(value);
  }

  download(value: any) {
    this.downloadEmit.emit(value);
  }

  detalhes(value: any) {
    this.detalhesEmit.emit(value);
  }

  logout(id: any, firstName: any) {
    this.logoutEmit.emit({
      id: id,
      firstName: firstName
    });
  }

  pesquisar(value: any) {
    this.search.emit(value);
  }
}
