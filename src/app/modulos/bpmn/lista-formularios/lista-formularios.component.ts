import { Component, Input, OnInit } from '@angular/core';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { Subscription } from 'rxjs';
import { ListaConectoresComponent } from '../conector/lista-conectores/lista-conectores.component';
import { DialogModule } from 'primeng/dialog';
import { CriarFormularioComponent } from '../criar-formulario/criar-formulario.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lista-formularios',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent,
    ListaConectoresComponent,
    DialogModule,
    CriarFormularioComponent,
    ButtonModule
  ],
  templateUrl: './lista-formularios.component.html',
  styleUrl: './lista-formularios.component.scss'
})
export class ListaFormulariosComponent implements OnInit {

  @Input() tipo: string = 'FORM';
  protected visible = false;
  protected viewVersoes = false;
  protected formulario?: any;
  protected cols: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Descrição', field: 'descricao' },
    { header: 'Versão', field: 'versao' },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Id', field: 'key' },
  ];


  protected versoes: any[] = [];
  protected formularios = [];
  protected subjectForm: Subscription;

  constructor(
    private readonly formularioService: FormularioService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute) {

    this.subjectForm = formularioService.reload.subscribe((data) => {
      this.tipo = data;
      this.listaFormularios();
    });
  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.formularios = [];
        this.tipo = param['tipo'] ?? 'form';
    });
    this.listaFormularios();
  }

  listaFormularios() {
    if (this.tipo.toUpperCase() == 'FORM' || this.tipo.toUpperCase() == 'BPMN' || this.tipo.toUpperCase() == 'DMN')
      this.formularioService.listaFormularios(this.tipo.toUpperCase()).subscribe(response => {
        this.formularios = response;
      });
  }

  editarVersoesFormularios(value: any) {
    this.formularioService.listaVersoesFormularios(value.idVersao ?? value.id, true).subscribe(response => {
      this.versoes = response;
      if (this.versoes.length > 1)
        this.viewVersoes = true;
      else {
        this.visible = true;
        this.formulario = value;
      }
    });
  }

  removerVersoesFormularios(id: string) {
    this.formularioService.listaVersoesFormularios(id).subscribe(response => {
      this.versoes = response;
      if (this.versoes.length)
        this.viewVersoes = true;
      else
        this.remover(id, true);
    });
  }

  getTitulo() {
    if (this.tipo == 'form')
      return {
        titulo: '',
        bt: 'Novo Formulário'
      };
    if (this.tipo == 'bpmn')
      return {
        titulo: '',
        bt: 'Novo Fluxo'
      };
    if (this.tipo == 'dmn')
      return {
        titulo: '',
        bt: 'Nova Decisão'
      };
    if (this.tipo == 'conectores')
      return {
        titulo: '',
        bt: 'Novo Conector'
      };
    return {
      titulo: '',
      bt: ''
    };
  }

  editar(value: any, force?: boolean) {
    if (force) {
      this.visible = true;
      this.formulario = value;
    } else {
      this.editarVersoesFormularios(value);
    }
  }

  adicionar() {
    this.visible = true;
    this.formulario = {
      nome: '',
      descricao: '',
      tipoFormulario: ''
    };
  }

  configurar(value: any) {
    const idVersao = value.formularioBase?.id ?? value.id;
    this.formularioService.listaVersoesFormularios(idVersao, true).subscribe(response => {
      this.versoes = response;
      if (this.versoes.length > 1 && !this.viewVersoes)
        this.viewVersoes = true;
      else {
        this.router.navigate([`/painel/configuracoes/${this.tipo.toLowerCase()}/config/${this.tipo.toLowerCase()}/${value.id}`])
      }
    });

  }

  remover(id: any, force?: boolean) {
    if (this.tipo === 'bpmn' && !force) {
      this.removerVersoesFormularios(id);
    } else {
      this.confirmationService.confirm({
        message: 'Remover versão?',
        header: 'Confirmar ação',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Sim, remover',
          severity: 'danger'
        },
        accept: () => {
          this.formularioService.removerFormulario(id).subscribe(() => {
            this.listaFormularios();
            if (force)
              this.versoes = this.versoes.filter(ver => ver.id != id);
          }, error => {
            if (force)
              this.removerVersoesFormularios(id);
          });
        }
      });
    }
  }

  habilitar(value: any, force?: boolean) {
    this.formularioService.habilitarFormulario(value.id).subscribe(() => {
      this.formularios.forEach(it => {
        if (it.id == value.id)
          it.enabled = !it.enabled
      })
      if(force)
      this.versoes.forEach(it => {
        if (it.id == value.id)
          it.enabled = !it.enabled
      })
    })
  }
}
