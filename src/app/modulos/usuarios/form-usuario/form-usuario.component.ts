import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { VoltarSalvarComponent } from '../../../shared/components/voltar-salvar/voltar-salvar.component';
import { HorarioAtendimentoComponent } from '../../../shared/components/horario-atendimento/horario-atendimento.component';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DiasDescriptions } from 'src/app/shared/models/dia-semana.enum';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { SkeletonComponent } from 'src/app/shared/components/skeleton/skeleton.component';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { GrupoService } from 'src/app/shared/services/grupo.service';
import { Usuario } from '../models/usuario.model';
import { LayoutService } from 'src/app/base/services/layout.service';
import { PermissoesService } from '@/shared/services/permissoes.service';
import { LoadService } from '@/shared/components/preload/load.service';
import { ButtonModule } from 'primeng/button';
import { PermissaoEnumDescriptions } from '@/shared/models/grupo-permissao.enum';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormularioModule,
    HorarioAtendimentoComponent,
    VoltarSalvarComponent,
    FieldsetModule,
    SkeletonComponent,
    ButtonModule
  ],
  providers: [],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss'
})
export class FormUsuarioComponent implements OnInit {

  protected semRestricao: boolean = false;
  protected usuario: Usuario;
  protected form: FormGroup;
  protected gruposAcesso!: any;
  protected departamentos: any[] = [];
  protected permissoes: any[] = [];
  protected diaDescriptions = DiasDescriptions;
  protected grupoPermissaoDescriptions = PermissaoEnumDescriptions
  protected perfil: any;
  protected load = false;
  protected permissaoUsuario?: any;

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly usuarioService: UsuarioService,
    private readonly permissoesService: PermissoesService,
    private readonly formBuilder: FormBuilder,
    private readonly layoutService: LayoutService,
    private readonly activeRoute: ActivatedRoute,
    private readonly grupoService: GrupoService,
    private readonly loadService: LoadService,
    private readonly location: Location
  ) {

    this.form = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dataNascimento: [''],
      horario: [''],
    });
  }

  ngOnInit(): void {
    this.load = true;
    this.listarPerfils()
    this.activeRoute.params.subscribe(param => {
      if (param['id'])
        this.buscarInfoUsuario(param['id']);
      else {
        this.usuario = new Usuario();
        this.load = false;
      };
    });

  }

  private buscarInfoUsuario(id: string) {
    this.usuarioService.infoUsuario(id).subscribe(response => {
      this.usuario = response;
      this.permissaoUsuario = {id: this.usuario.permissao};
      console.log('permissao', this.usuario);

      this.load = false;
      this.listarGrupos();
      this.listarGruposTarefa();
      this.loadService.addRecent({
          id: this.usuario.id,
          name: this.usuario.firstName,
          descricao: 'Usuário',
          color: 'text-red-400'
        })
    }, error => {
      this.load = false;
      this.usuario = new Usuario();
    });
  }

  listarGrupos() {
    this.usuarioService.listaGruposAcesso().subscribe(response => {
      this.gruposAcesso = response
    })
  }

  listarGruposTarefa() {
    this.grupoService.listaGrupos(TipoGrupo.DEPARTMENT).subscribe(response => {
      this.departamentos = response;
      this.usuario.departamentos = this.departamentos.filter(dep => this.usuario.departamentos.find(deu => dep.id == deu.id))
    })
  }

   protected listarPerfils() {
    this.permissoesService.listaPermissoes().subscribe(response => {
      this.permissoes = response;
    });
  }

   atualizarPermissao() {
    this.permissoesService.atualizarPermissao(this.permissaoUsuario.id, this.usuario.id).subscribe(response => {
      this.buscarInfoUsuario(this.usuario.id);
    });
  }

  isInvalid(field: string) {
    return this.form.get(field)?.touched && !this.form.get(field)?.valid
  }

  removerOtp(){
    this.confirmationService.confirm({
      message: 'Ao remover, o usuário deve reconfigurar seu codigo 2FA',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
       rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, concluir',
      },
      accept: () => {
       this.usuarioService.removerOtp(this.usuario.id).subscribe();
      }
    });
  }

  salvar() {
    if (!this.usuario.id) {

      this.usuario.tema = {
        dark: this.layoutService.layoutConfig().darkTheme,
        color: this.layoutService.layoutConfig().primary,
        toggle: this.layoutService.layoutState().staticMenuDesktopInactive
      }

      this.usuarioService.criarUsuario(this.usuario).subscribe(() => {
        this.location.back();
      }, fail => {
      });
    } else {

      this.usuarioService.atualizarUsuario(this.usuario).subscribe(() => {
      }, fail => {
      });
    }
  }

  joinGrupo(event: any) {
    if (!this.usuario.id)
      return;

    if (event?.originalEvent?.option?.id && !event?.originalEvent?.selected) {
      this.usuarioService.joinGruposAcesso(this.usuario.id, event?.originalEvent?.option.id).subscribe(() => { }, fail => {

      })
    } else {
      this.usuarioService.deleteGruposAcesso(this.usuario.id, event?.itemValue?.id).subscribe(() => {
      }, fail => { })
    }
  }

  hideDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

      }
    });
  }
}

