import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TituloPesquisaComponent } from '../../../shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { TabsModule } from 'primeng/tabs';
import { PermissoesService } from '@/shared/services/permissoes.service';
import { DataAnterirorPipe } from '@/shared/pipes/data-atual.pipe';
import { ListaGruposComponent } from '@/modulos/processo/grupos/lista-grupos/lista-grupos.component';
import { ListaPermissoesComponent } from '../lista-permissoes/lista-permissoes.component';
import { RelatorioService } from '@/shared/services/relatorio.service';
import { baixar } from '@/shared/services/util/FileUtil';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    SelectModule,
    InputIconModule,
    TagModule,
    InputTextModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    RippleModule,
    IconFieldModule,
    RouterModule,
    TituloPesquisaComponent,
    TabelaComponent,
    PaginatorModule,
    DialogModule,
    MessageModule,
    ToastModule,
    TabsModule,
    DataAnterirorPipe,
    ListaGruposComponent,
    ListaPermissoesComponent
  ],
  templateUrl: './lista-usuarios.component.html'
})
export class ListaUsuariosComponent implements OnInit {

  @ViewChild(TituloPesquisaComponent) appPesquisa!: TituloPesquisaComponent;

  protected tab = 'users';
  protected cols: any = [
    { header: 'Nome', field: 'firstName' },
    { header: 'Sobrenome', field: 'lastName' },
    { header: 'Nº documento', field: 'username' },
    { header: 'Celular', field: 'phone' },
    { header: 'Email', field: 'email' },
    { header: 'Verificado', field: 'emailVerified' },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Id', field: 'id' },


  ]

  protected itens: any[] = [];
  protected permissoes: any[] = [];
  protected size: number = 10;
  protected showLogout = false;
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

  protected sessoesUsuario: any[] = [];
  protected userSelecionador?: any;
  protected textoPesquisa = '';

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly usuarioService: UsuarioService,
    private readonly permissoesService: PermissoesService,
    private readonly relatorioService: RelatorioService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      this.tab = param['tab'] ?? 'contas';
    })
    this.listarUsuarios(this.pagina);
    this.listarPermissoes();
  }

  pesquisar(event: any) {
    this.textoPesquisa = event;
  }

  onPageChange(event: PaginatorState) {
    this.listarUsuarios(event);
  }

  selectTab(event: any) {
    this.location.go(`/painel/users?tab=${event}`);
    this.tab = event;
  }

  protected listarUsuarios(page: PaginatorState) {
    this.usuarioService.listaUsuarios(page).subscribe(response => {
      this.itens = response;
    });
  }

  protected listarPermissoes() {
    this.permissoesService.listaPermissoes().subscribe(response => {
      this.permissoes = response;
    });
  }


  atualizaLista() {
    this.pagina.page = 0;
    this.pagina.first = 0;
    this.listarUsuarios(this.pagina);
  }

  getTotal() {
    if (!this.itens?.length)
      return this.pagina.rows;
    return this.pagina.rows + 1;
  }

  editar(id: any) {
    this.router.navigate([`/${id}`])
  }

  logout(user: any) {
    this.usuarioService.listaSessoesUsuarios(user?.id).subscribe(response => {
      this.sessoesUsuario = response;
      this.userSelecionador = user;
    })
    this.showLogout = true;
  }

  deslogar() {
    if (this.userSelecionador?.id) {
      this.usuarioService.logoutUsuario(this.userSelecionador).subscribe(() => {
        this.showLogout = false;
      });
    }
  }

  lock(user: any) {
    this.usuarioService.ativarUsuario(user.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário foi alterado',
        life: 3000
      });
      this.listarUsuarios(this.pagina);
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Falhou ao salvar',
        life: 3000
      });
    });
  }

  editarUsuario(value: any) {
    this.router.navigate([`painel/users/edit/${value.id}`])
  }

  detalhesUsuario(value: any) {
    this.router.navigate([`painel/users/detalhes/${value.id}`])
  }

  editarPemisao(value: any) {
    this.router.navigate([`painel/users/grupos/edit/${value.id}`])
  }

  removerUsuario(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente remover esse usuário?',
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
        this.usuarioService.removerUsuario(event).subscribe(() => {
          this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'Usuário foi removido' });
          this.listarUsuarios(this.pagina);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao remover usuário!' });
        })
      }
    });
  }

  imprimir(formato: any) {
    this.relatorioService.imprimirRelatorioUsuarios({
      formato: formato,
      apenasAtivos: this.appPesquisa.ativos
    }).subscribe(data => {
      baixar(data)
    });
  }
}

