import { TipoDrawer } from '@/base/drawers/tipo-drawers.enum';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, Input, ViewChild } from '@angular/core';
import { SplitButton } from 'primeng/splitbutton';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';
import { TarefaService } from '@/shared/services/tarefa.service';
import { DialogModule } from 'primeng/dialog';
import { PublicarMensagemSignalComponent } from '../publicar-mensagem-signal/publicar-mensagem-signal.component';
@Component({
  selector: 'app-numero-protocolo',
  imports: [
    SplitButton,
    ClipboardModule,
    DialogModule,
    PublicarMensagemSignalComponent
  ],
  templateUrl: './numero-protocolo.component.html',
  styleUrl: './numero-protocolo.component.scss'
})
export class NumeroProtocoloComponent {

  @Input() instancia?: any;
  @Input() isTable = false;
  @Input() text = false;
  @ViewChild('splitbutton') splitbutton: SplitButton;
  @ViewChild(Menu) menu!: Menu;
  protected items: any[] | undefined;
  protected visible = false;

  constructor(
    private readonly instanciaService: InstanciaService,
    private readonly confirmationService: ConfirmationService,
    private readonly tarefaService: TarefaService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly clipboard: Clipboard) { }

  ngOnInit() {

    this.items = [
      {
        icon: 'pi pi-arrow-circle-right',
        label: 'Detalhes',
        disabled: this.router.url.startsWith('/painel/protocolo/'),
        command: () => {
          this.router.navigate([`/painel/protocolo/${this.instancia.businessKey}/detalhes/${this.instancia.id}`]);
        }
      },
       {
        icon: 'pi pi-arrow-circle-right',
        label: 'Delegar tarefa',
        disabled: this.router.url.startsWith('/painel/protocolo/'),
        command: () => {
          this.router.navigate([`/painel/protocolo/${this.instancia.businessKey}/detalhes/${this.instancia.id}`]);
        }
      },
      {
        icon: 'pi pi-copy',
        label: 'Copiar',
        items: [
          {
            icon: 'pi pi-copy',
            label: 'Copiar Protocolo',
            disabled: !this.instancia?.businessKey,
            command: () => {
              this.clipboard.copy(this.instancia?.businessKey);
            }
          }, {
            icon: 'pi pi-copy',
            label: 'Copiar Id Tarefa',
            disabled: !this.instancia?.taskId,
            command: () => {
              this.clipboard.copy(this.instancia?.taskId);
            }
          }, {
            icon: 'pi pi-copy',
            label: 'Copiar Id Instância',
            disabled: !this.instancia?.id,
            command: () => {
              this.clipboard.copy(this.instancia?.taskId);
            }
          }
        ]

      },

      {
        icon: 'pi pi-history',
        label: 'Histórico',
        command: () => {
          this.instanciaService.show({
            tipo: TipoDrawer.INSTANCE,
            view: true,
            instanceId: this.instancia.id,
            nome: 'Detalhes da Instância',
            subnome: this.instancia.businessKey,
            icon: 'pi-history',
          });
        }
      },
      {
        icon: 'pi pi-comment',
        label: 'Comentários',
        command: () => {
          this.instanciaService.show({
            tipo: TipoDrawer.COMENTARIOS,
            view: true,
            instanceId: this.instancia.id
          });
        }
      },
      {
        icon: 'pi pi-file',
        label: 'Documentos',
        command: () => {
          this.instanciaService.show({
            tipo: TipoDrawer.VISUALIZAR_ARQUIVOS,
            view: true,
            instanceId: this.instancia.id,
            nome: 'Documentos da Instância',
            icon: 'pi-file',
          });
        }
      }
    ];

    if (this.instancia?.state != 'COMPLETED')
      this.items.push(
        {
          icon: 'pi pi-th-large',
          label: 'Ir para Tarefa Atual',
          disabled: this.router.url.startsWith('/painel/tarefa/detalhes'),
          severity: 'info',
          command: () => {
            this.tarefaService.buscarTasksInstanciaAtiva(this.instancia.id).subscribe(response => {
              if (response.length)
                this.router.navigate([`/painel/tarefa/detalhes/${response[0].id}`]);
              else
                this.messageService.add({ severity: 'warn', summary: 'Nenhuma ação', detail: 'Não há tarefas ativas' });
            })
          }
        });

    if ((this.instancia?.definitionId || this.instancia?.processDefinitionId) && this.instancia?.state != 'COMPLETED')
      this.items.push(
        {
          icon: 'pi pi-envelope',
          label: 'Publicar Mensagem',
          severity: 'info',
          command: () => {
            this.visible = true;
          }
        });

    if (this.instancia?.state == 'COMPLETED')
      this.items.push(
        {
          icon: 'pi pi-refresh',
          label: 'Reabrir Protocolo',
          command: () => {
            this.instanciaService.show({
              tipo: TipoDrawer.REABRIR_PROTOCOLO,
              view: true,
              instanceId: this.instancia.id
            });
          }
        });

    if (this.instancia?.suspended != undefined)
      this.items.push({
        icon: this.instancia?.suspended ? 'pi pi-play-circle' : 'pi pi-stop-circle',
        label: this.instancia?.suspended ? 'Ativar Instância' : 'Suspender Instância',
        command: () => {
          this.ativarInstancia(this.instancia);
        }
      });

    this.items.push({
      icon: 'pi pi-times',
      label: 'Fechar',
      command: () => {
        if (this.menu)
          this.menu.hide();
      }
    })
  }

  ativarInstancia(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: event.suspended ? 'Iniciar Instância?' : 'Deseja realmente interromper essa instância?',
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
        severity: event.suspended ? 'success' : 'danger',
        label: event.suspended ? 'Sim, iníciar' : 'Sim, interromper',
      },
      accept: () => {
        this.instanciaService.ativarInstancia(event.id, !event.suspended).subscribe(() => {
          this.instancia.suspended = !event.suspended;
          if (!this.instancia.suspended)
            this.router.navigate([`/painel/protocolo/${this.instancia.businessKey}/detalhes/${this.instancia.id}`])
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao iniciar o processo!' });
        })
      }
    });
  }

  publicarMensagem() {

  }

  handleMainClick(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([`/painel/protocolo/${this.instancia.businessKey}/detalhes/${this.instancia.id}`]);
  }
}
