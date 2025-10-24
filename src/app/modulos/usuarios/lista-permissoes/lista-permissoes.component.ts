import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TituloPesquisaComponent } from '../../../shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioService } from '@/shared/services/usuario.service';
import { PermissoesService } from '@/shared/services/permissoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { VoltarSalvarComponent } from '@/shared/components/voltar-salvar/voltar-salvar.component';
import { PickListModule } from 'primeng/picklist';
import { InputText } from 'primeng/inputtext';
import { LayoutService } from '@/base/services/layout.service';


@Component({
  selector: 'app-lista-permissoes',
  imports: [
    CommonModule,
    TabelaComponent,
    TituloPesquisaComponent,
    DialogModule,
    FormsModule,
    VoltarSalvarComponent,
    PickListModule,
    InputText
  ],
  templateUrl: './lista-permissoes.component.html',
  styleUrl: './lista-permissoes.component.scss',
  styles: `
  ::ng-deep {
      .p-orderlist-list-container {
          width: 100%;
      }
  }
`,
})
export class ListaPermissoesComponent implements OnInit {

  protected colsPermissoes: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Usuários', field: 'countUsers' },
    { header: 'Atribuições', field: 'countGrupos' },
  ]

  protected permissoes: any[] = [];
  protected size: number = 10;
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  protected grupos: any[] = [];
  protected usuarios: any[] = [];
  protected usuariosDB: Map<string, any> = new Map();
  protected gruposDB: Map<string, any> = new Map();
  protected sessoesUsuario: any[] = [];
  protected userSelecionador?: any;
  protected textoPesquisa = '';
  protected viewGrupoUsuario = false;
  protected viewPermissao = false;
  protected viewConfiguracaoPermissao = false;
  protected permissao?: any = {};

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly usuarioService: UsuarioService,
    private readonly permissoesService: PermissoesService,
    private readonly messageService: MessageService,
    public layoutService: LayoutService,
    private readonly location: Location,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.listarPermissoes();
    this.listarUsuarios();
    this.listarPerfils();
  }

  protected listarPermissoes() {
    this.permissoesService.listaPermissoes().subscribe(response => {
      this.permissoes = response;
    });
  }

  protected listarPerfils() {
    this.permissoesService.listaPerfisGrupo().subscribe(response => {
       response.forEach(grupo => this.gruposDB.set(grupo.grupo, grupo));
    });
  }

  protected listarUsuarios() {
    this.usuarioService.listaUsuarios({
      page: 0,
      first: 0,
      rows: 1000,
      pageCount: 100,
    }).subscribe(response => {
      response.forEach(user => this.usuariosDB.set(user.id, user))
    });
  }

  salvarNome() {
    this.permissoesService.criarPermissao({
      id: this.permissao.id,
      nome: this.permissao.nome,
    }).subscribe(response => {
      this.permissao.id = response.id;
      this.viewPermissao = false;
      this.listarPermissoes();
    });
  }

  salvar(isUser: boolean) {
    this.permissoesService.atualizarGrupoPermissao(isUser, {
      id: this.permissao.id,
      users: this.permissao?.usersSelect?.map(user => {
        return {
          userId: user.id
        }
      }),
      grupos: this.permissao?.gruposSelect?.map(grupo => {
        return {
          grupo: grupo.grupo
        }
      })
    }).subscribe(response => {
      this.permissao.id = response.id;
      this.listarPermissoes();
    });
  }

  removerPermisao(value: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Remover permissão?',
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
        this.permissoesService.removerPermissao(value).subscribe(() => {
          this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'Permissão foi removido' });
          this.listarPermissoes();
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao remover permissão!' });
        })
      }
    });
  }

  editarPermissao(value?: any) {
    if (value)
      this.permissao = value;
    if (!this.permissao?.nome)
      this.permissao = { nome: '' }
    this.viewPermissao = true;
  }

  configurarPermissao(value?: any) {
    if (value)
      this.permissao = value;
    if (!this.permissao?.gruposSelect)
      this.permissao.gruposSelect = [];
    this.permissao?.grupos.forEach(grupo => {
      if(this.gruposDB.has(grupo.grupo))
       this.permissao?.gruposSelect.push(this.gruposDB.get(grupo.grupo))
        this.gruposDB.delete(grupo.grupo);
    })
    this.grupos = Array.from(this.gruposDB.values());
    console.log('Select', this.permissao?.gruposSelect);

    console.log('grupos', this.grupos);

    this.viewConfiguracaoPermissao = true;
  }

  grupoUsuario(value: any) {

    this.permissao = value;
if (!this.permissao?.usersSelect)
      this.permissao.usersSelect = [];
    this.permissao.users.forEach(user => {
      if(this.usuariosDB.has(user.userId))
       this.permissao?.usersSelect.push(this.usuariosDB.get(user.userId))
       this.usuariosDB.delete(user.userId);
    });
    this.usuarios = Array.from(this.usuariosDB.values());
    this.viewGrupoUsuario = true;
  }

}

