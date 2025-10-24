import { ProcessStartRequest } from '@/shared/models/process-start-request.model';
import { DeployFormularioService } from '@/shared/services/formulario-deploy.service';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-start-processo',
  imports: [
    DialogModule,
    DatePickerModule,
    FormsModule,
    CheckboxModule,
    ButtonModule
  ],
  templateUrl: './start-processo.component.html',
  styleUrl: './start-processo.component.scss'
})
export class StartProcessoComponent {

  protected processStartRequest: ProcessStartRequest = new ProcessStartRequest();
  protected deploy?: any;
  protected executionDate: Date = new Date;
  protected response: any;


  constructor(
    private readonly deployFormularioService: DeployFormularioService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig
  ) {
     this.processStartRequest = config.data;
  }

  confirmarSuspencao(suspender: boolean) {
    this.processStartRequest.suspended = suspender;
    if (!this.processStartRequest.immediately)
      this.processStartRequest.executionDate = this.executionDate;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: suspender ? `Deseja realmente interromper processo?\n ${this.processStartRequest.allProcess ?? ' Todos os processos relacionados serão suspensos'}` : 'Iniciar processo?',
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
        label: suspender ? 'Sim, suspender' : 'Sim, iníciar',
      },
      accept: () => {
        if (this.processStartRequest?.isInstancia) {
          this.deployFormularioService.ativarInstancia(this.processStartRequest).subscribe(response => {
            this.response = response;
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao iniciar o processo!' });
          })
        } else if(this.processStartRequest?.isProcess) {
          this.deployFormularioService.ativarProcesso(this.processStartRequest).subscribe(response => {
             this.response = response;
             this.deployFormularioService.updateProcessEmit.emit();
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao iniciar o processo!' });
          })
        }

      }
    });
  }

  fechar() {
    this.ref.close(this.response)
  }
}
