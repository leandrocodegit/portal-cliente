import { LoadService } from '@/shared/components/preload/load.service';
import { Task } from '@/shared/models/task';
import { FilesTarefaService } from '@/shared/services/files-tarefa.service';
import { FormularioService } from '@/shared/services/formulario.service';
import { IdentityService } from '@/shared/services/identity.service';
import { TarefaService } from '@/shared/services/tarefa.service';
import { UsuarioService } from '@/shared/services/usuario.service';
import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TaskUserAssigneeComponent, TipoResponsavel } from '../task-assignment/task-user-assignee/task-user-assignee.component';
import { AuthService } from '@/auth/services/auth.service';
import { MultiSelect } from 'primeng/multiselect';
import { Avatar } from 'primeng/avatar';
import { Usuario } from '@/modulos/usuarios/models/usuario.model';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-criar-tarefa',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    SelectModule,
    MultiSelect,
    TaskUserAssigneeComponent,
    Avatar,
    Message
  ],
  templateUrl: './criar-tarefa.component.html',
  styleUrl: './criar-tarefa.component.scss'
})
export class CriarTarefaComponent implements OnInit {

  @Input() instancia?: any;
  @Input() parentTaskId?: any;
  protected tarefa = new Task();
  protected viewFormulario = false;
  protected formularioSelecionados: any[] = [];
  protected load = false;
  protected formularios: any[] = [];
  protected userAssignee?: Usuario;
  protected erro?: string;
  protected ADICIONAL = TipoResponsavel.ADICIONAL;


  constructor(
    private readonly formularioService: FormularioService,
    private readonly filesTarefaService: FilesTarefaService,
    private readonly tarefaService: TarefaService,
    private readonly identityService: IdentityService,
    private readonly usuarioService: UsuarioService,
    private readonly loadService: LoadService,
    private readonly authService: AuthService,
    private readonly location: Location,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.listaFormularios();
  }

  listaFormularios() {
    this.formularioService.listaFormularios('FORM').subscribe(response => {
      this.formularios = response;
    });
  }

  salvar() {

    this.erro = undefined;
    if (!this.userAssignee) {
      this.erro = 'Indique um responsável!';
      return;
    } else if (this.formularioSelecionados.length == 0) {
      this.erro = 'Selecione ao menos um formulário!';
      return;
    }

    const id = crypto.randomUUID();
    this.tarefaService.criarTarefa(new Task({
      id: id,
      assignee: this.userAssignee.id,
      name: 'Tarefa Adicional',
      description: `${this.instancia.businessKey};Supervisionada`,
      owner: this.authService.extrairIdUsuario(),
      processInstanceId: this.instancia.id,
      processDefinitionId: this.instancia.definitionId,
      caseInstanceId: this.instancia.id,
      parentTaskId: this.parentTaskId
    })).subscribe(() => {

      const variavel = {
        value: JSON.stringify(this.formularioSelecionados),
        type: 'Object',
        valueInfo: {
          objectTypeName: 'java.util.ArrayList',
          serializationDataFormat: 'application/json'
        }
      }

      this.viewFormulario = false;

      this.tarefaService.incluirVarivalLocalTextoTarefa(id, 'formularios-adicionais', variavel).subscribe();
    });
  }

  getInitials(user: Usuario): string {
    if (!user)
      return '';

    const first = user.firstName ? user.firstName.charAt(0) : '';
    const last = user.lastName ? user.lastName.charAt(0) : '';
    return `${first}${last}`.toUpperCase();
  }
}
