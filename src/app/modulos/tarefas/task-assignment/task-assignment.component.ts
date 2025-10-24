import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Módulos PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { UsuarioService } from '@/shared/services/usuario.service';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Usuario } from '@/modulos/usuarios/models/usuario.model';
import { AuthService } from '@/auth/services/auth.service';
import { TaskUserAssigneeComponent } from './task-user-assignee/task-user-assignee.component';
import { ConfirmationService } from 'primeng/api';

// Interface para o modelo de usuário

@Component({
  selector: 'app-task-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    AvatarModule,
    IconField,
    InputIcon
  ],
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.scss']
})
export class TaskAssignmentComponent implements OnInit {

  @Input() assignee?: string;
  @Input() isFiltro = false;
  @Input() apenasAtribuir = false;
  @Output() assigneeEmit = new EventEmitter();
  @Output() unssigneeEmit = new EventEmitter();
  protected assignedUser: Usuario | null = null;

  // Lista de todos os usuários disponíveis
  private allUsers: Usuario[] = [];

  // Lista de usuários disponíveis (filtrada pela pesquisa)
  protected availableUsers: Usuario[] = [];

  // Termo de pesquisa
  protected searchTerm: string = '';

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  protected listarUsuarios() {

    if (this.usuarioService.getMemoriaUsuarios.length) {
      this.allUsers = this.usuarioService.getMemoriaUsuarios;
      this.filtrar();
    }
    else {
      this.usuarioService.listaTodosUsuarios().subscribe(response => {
        this.allUsers = response;
        this.usuarioService.getMemoriaUsuarios = this.allUsers;
        this.filtrar();
      });
    }
  }

  private filtrar() {
    if (this.assignee) {
      this.assignedUser = this.allUsers.find(user => user.id == this.assignee);
      this.allUsers = this.allUsers.filter(user => user.id != this.assignee);
    }
    this.filterUsers();
  }

  igualUsuarioLogado(): boolean {
    if (!this.assignee)
      return false;
    return this.assignee == this.authService.extrairIdUsuario();
  }
  filterUsers(): void {
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    this.availableUsers = this.allUsers.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      // Não mostra o usuário que já está atribuído na lista de disponíveis
      return user.id !== this.assignedUser?.id && fullName.includes(lowerCaseSearch);
    });
  }

  assumir() {
    this.assignedUser = this.allUsers.find(user => user.id == this.authService.extrairIdUsuario())
    this.assignUser(this.assignedUser, 'USER');
  }

  assignUser(user: Usuario, tipo: string): void {
    this.confirmationService.confirm({
      message: 'Atribuir Responsável',
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
        label: 'Sim, Atribuir',
        severity: 'danger'
      },
      accept: () => {
        this.assignedUser = user;
        this.assigneeEmit.emit({user: this.assignedUser, tipo: tipo});
      }
    });
  }

  unassignUser(): void {
    this.confirmationService.confirm({
      message: 'Remover Responsável',
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
        this.assignedUser = null;
        this.assigneeEmit.emit();
        this.filterUsers();
      }
    });
  }

  getInitials(user: Usuario): string {
    const first = user.firstName ? user.firstName.charAt(0) : '';
    const last = user.lastName ? user.lastName.charAt(0) : '';
    return `${first}${last}`.toUpperCase();
  }
}
