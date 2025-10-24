import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PopoverModule } from 'primeng/popover';
import { SkeletonModule } from 'primeng/skeleton';
import { Usuario } from 'src/app/modulos/usuarios/models/usuario.model';
import { MinhaContaService } from '../services/minha-conta.service';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { PermissaoEnumDescriptions } from '@/shared/models/grupo-permissao.enum';
import { User } from '@/shared/models/User.model';

@Component({
  selector: 'app-meus-dados',
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    FieldsetModule,
    ButtonModule,
    PopoverModule,
    InputTextModule,
    FormsModule,
    MessageModule,
    TituloCurtoComponent
  ],
  templateUrl: './meus-dados.component.html',
  styleUrl: './meus-dados.component.scss'
})
export class MeusDadosComponent implements OnInit {

  protected usuario?: User;
  protected grupoPermissaoDescriptions = PermissaoEnumDescriptions;
  protected load = false;
  protected mensagem?: any;
  protected password: any = {
    old: '',
    password: '',
    confirm: '',
    username: '',
    sessionId: ''
  };

  constructor(
    private readonly minhaContaService: MinhaContaService,
    private readonly location: Location
  ) { }

  ngOnInit(): void {
    this.buscarInformacoesUsuario()
  }

  private buscarInformacoesUsuario() {
    this.load = true;
    this.minhaContaService.buscarInfoUsuarioLogado().subscribe(response => {

      if(response?.attributes == null)
        response.attributes = new Map();

      if(response?.attributes.has('phone')){
        response.attributes.set('phone', ['']);
      }
      this.usuario = response;
      this.load = false;
    }, error => {
      this.load = false;
    });
  }

  voltar() {
    this.location.back();
  }

  alterarSenha() {
    this.password.username = this.usuario.username;
    this.password.sessionId = sessionStorage.getItem('session_state');
    this.minhaContaService.alterarSenha(this.password).subscribe(() => {
      this.mensagem = {
        severity: 'success',
        text: 'Senha alterada com sucesso!'
      }
    }, error => {
      this.mensagem = {
        severity: 'error',
        text: 'Falha ao alterar senha!'
      }
    });
  }
}
