import { Component, OnInit } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { FieldsetModule } from 'primeng/fieldset';
import { SelecionaDiasSemadaComponent } from '../../../../shared/components/seleciona-dias-semada/seleciona-dias-semada.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AgendaService } from '../../services/agenda.service';
import { Configuracao } from '../../models/agenda.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RadioButtonModule } from 'primeng/radiobutton';
import { VoltarSalvarComponent } from '../../../../shared/components/voltar-salvar/voltar-salvar.component';




@Component({
  selector: 'app-configuracaoes-agenda',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    FormsModule,
    FieldsetModule,
    FluidModule,
    IconFieldModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    RadioButtonModule,
    InputTextModule,
    SelecionaDiasSemadaComponent,
    VoltarSalvarComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  templateUrl: './configuracaoes-agenda.component.html',
  styleUrl: './configuracaoes-agenda.component.scss'
})
export class ConfiguracaoesAgendaComponent implements OnInit {

  protected configuracao: Configuracao = {} as Configuracao;
  radioValue = false;
  date1: Date | undefined = new Date;

  date2: Date | undefined;

  date3: Date | undefined;
  checkboxValue = false
  hora = '10:30'

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly agendaService: AgendaService
  ) { }

  ngOnInit(): void {
    this.agendaService.buscarConfiguracao().subscribe(response => {
      response.content.forEach((conf: Configuracao) => {


        this.configuracao = response.content[0];
      })
    })
  }


  salvar() {
    console.log(this.configuracao.horarioInicio);
    this.agendaService.salvarConfiguracao(this.configuracao).subscribe((response) => {
      this.configuracao = response

    })
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Configuração atualizada',
      life: 3000
    });

  }

  hideDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000
        });
      }
    });
  }

  mudou(){
  }

}
