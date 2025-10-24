import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { TabelaService } from './tabela.service';
import { Subscription } from 'rxjs';
import { IdentityService } from '../../services/identity.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TooltipModule } from 'primeng/tooltip';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '@/auth/services/auth.service';
import { StatusTarefaDescriptions } from '@/modulos/tarefas/models/status-tarefa.enum';

@Component({
  selector: 'app-tabela',
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    FormsModule,
    TagModule,
    PaginatorModule,
    SelectModule,
    DatePipe,
    PopoverModule,
    MessageModule,
    ButtonModule,
    ClipboardModule,
    TooltipModule,
    InputText,
    FormsModule,
    PopoverModule
  ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent implements OnDestroy {

  @Input() itens!: any[];

  @Input() cols!: any[];
  @Output() editarEmit = new EventEmitter();
  @Output() detalhesEmit = new EventEmitter();
  @Output() excluirEmit = new EventEmitter();
  @Output() visualizarEmit = new EventEmitter();
  @Output() pageEmit = new EventEmitter();
  @Output() logoutEmit = new EventEmitter();
  @Output() lockEmit = new EventEmitter();
  @Output() refreshEmit = new EventEmitter();
  @Output() configEmit = new EventEmitter();
  @Output() stopEmit = new EventEmitter();
  @Output() playEmit = new EventEmitter();
  @Output() jsonEmit = new EventEmitter();
  @Output() downloadEmit = new EventEmitter();
  @Output() duplicarEmit = new EventEmitter();
  @Output() deployEmit = new EventEmitter();
  @Output() plusEmit = new EventEmitter();
  @Output() alertEmit = new EventEmitter();
  @Output() statusEmit = new EventEmitter();
  @Output() grupoUsuarioEmit = new EventEmitter();
  @Output() plusHeadEmit = new EventEmitter();
  @Output() search = new EventEmitter();
  protected statusTarefaDescriptions = StatusTarefaDescriptions;


  @Input() view: any;
  @Input() auth: any;
  @Input() page: PaginatorState = {
    rows: 0
  };

  @ViewChild('tabela') tabela: Table;


  protected active = false;
  protected pesquisa = '';
  protected first: number = 0;
  protected rows: number = 10;
  protected sessoesUsuario: any[] = [];
  private searchSubscription!: Subscription;
  private activeSubscription!: Subscription;
  @ViewChild('op') op!: Popover;

  constructor(
    private readonly tabelaService: TabelaService,
    public readonly identity: IdentityService,
    public readonly authService: AuthService
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

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.pageEmit.emit(event);
  }

  getSeverity(value: number) {
    if (value >= 200 && value < 300)
      return 'success';
    if (value >= 400 && value < 500)
      return 'warn';
    return 'danger';
  }

  editar(id: any) {
    this.editarEmit.emit(id);
  }

  excluir(id: any) {
    this.excluirEmit.emit(id);
  }

  detalhes(id: any) {
    this.detalhesEmit.emit(id);
  }

  refresh(value: any) {
    this.refreshEmit.emit(value);
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

  play(value: any) {
    this.playEmit.emit(value);
  }

  download(value: any) {
    this.downloadEmit.emit(value);
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

  duplicar(value: any) {
    this.duplicarEmit.emit(value);
  }

  implantar(value: any) {
    this.deployEmit.emit(value);
  }

  adicionar(value: any) {
    this.plusEmit.emit(value);
  }

  adicionarGrupo(value: any) {
    this.grupoUsuarioEmit.emit(value);
  }

  visualizarJson(value: any) {
    this.jsonEmit.emit(value);
  }

  alert(value: any) {
    this.alertEmit.emit(value);
  }

  status(value: any) {
    this.statusEmit.emit(value);
  }

  headPlus(){
    this.plusHeadEmit.emit();
  }

  copiar() {
    this.op.toggle(event);
    var intervalo = setInterval(() => {
      this.op.hide();
      clearInterval(intervalo);
    }, 1500)
  }
}
