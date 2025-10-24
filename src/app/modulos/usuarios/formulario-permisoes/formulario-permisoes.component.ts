import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { VoltarSalvarComponent } from '@/shared/components/voltar-salvar/voltar-salvar.component';
import { Permissao } from '@/shared/models/permissoes.model';
import { FormularioModule } from '@/shared/modules/formulario.module';
import { PermissoesService } from '@/shared/services/permissoes.service';
import { UsuarioService } from '@/shared/services/usuario.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'app-formulario-permisoes',
  imports: [
    FormularioModule,
    PickListModule,
    VoltarSalvarComponent
  ],
  templateUrl: './formulario-permisoes.component.html',
  styleUrl: './formulario-permisoes.component.scss'
})
export class FormularioPermisoesComponent {


  protected permissao = new Permissao
  protected grupos: any[] = [];
  protected usuarios: any[] = [];

  constructor(
    private readonly permissoesService: PermissoesService,
    private readonly usuarioService: UsuarioService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['id'])
        this.buscarPermissao(param['id']);
      else {
        this.listarPerfils();
        this.listarUsuarios();
      }

    })

  }

  protected buscarPermissao(id: any) {
    this.permissoesService.buscarGrupo(id).subscribe(response => {
      this.permissao = response;
      this.listarPerfils();
      this.listarUsuarios();
    });
  }

  protected listarPerfils() {
    this.permissoesService.listaPerfisGrupo().subscribe(response => {
      this.permissao.gruposSelect = [];
      this.grupos = [];
      response.forEach(grupo => {
        if (this.permissao?.grupos?.find(per => per.grupo == grupo.grupo))
          this.permissao?.gruposSelect.push(grupo)
        else this.grupos.push(grupo)
      });
    });
  }

  protected listarUsuarios() {
    this.usuarioService.listaUsuarios({
      page: 0,
      first: 0,
      rows: 1000,
      pageCount: 100,
    }).subscribe(response => {
      this.permissao.usersSelect = [];
      this.usuarios = [];
      response.forEach(user => {
        if (this.permissao?.users?.find(per => per.userId == user.id))
          this.permissao.usersSelect.push(user)
        else this.usuarios.push(user)
      });
    });
  }

  salvar() {
    this.permissoesService.criarPermissao({
      id: this.permissao.id,
      nome: this.permissao.nome,
      users: this.permissao.usersSelect.map(user =>  { return {
        userId: user.id
      }}),
      grupos: this.permissao.gruposSelect.map(grupo => { return {
        grupo: grupo.grupo
      }})
    }).subscribe(response => {
      this.permissao.id = response.id
    });
  }

}
