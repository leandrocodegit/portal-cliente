import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProtocoloService } from '../../../shared/services/protocolo.service';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-formulario-configuracao-protocolo',
  imports: [
    FormularioModule,
    TituloCurtoComponent,
    CheckboxModule,
    SelectModule,
    DialogModule
  ],
  templateUrl: './formulario-configuracao-protocolo.component.html',
  styleUrl: './formulario-configuracao-protocolo.component.scss'
})
export class FormularioConfiguracaoProtocoloComponent implements OnInit {

  @Output() closeEmit = new EventEmitter();
  @Output() salvarEmit = new EventEmitter();

  @Input() configuracao?: any;

  constructor(
    private readonly protocoloService: ProtocoloService,
    private readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly location: Location,
    private readonly activeRoute: ActivatedRoute,
  ) {
      this.configuracao = config.data;
   }

  ngOnInit(): void {
    if (!this.configuracao) {
      this.configuracao = {
        nome: '',
        descricao: '',
        publico: false
      }
    } else {
      this.buscarConfiguracao();
    }
  }


  buscarConfiguracao() {
    this.protocoloService.buscarConfiguracoesDeProtocolo(this.configuracao.id).subscribe(response => {
      this.configuracao = response;
    });
  }

  salvar() {
    this.protocoloService.criarConfiguracoesDeProtocolo(this.configuracao).subscribe(response => {
      this.salvarEmit.emit();
      this.configuracao = response;
      this.ref.close();
    }, error => {
      this.configuracao.id = undefined;
    });
  }

  fechar() {
    this.ref.close();
  }
}
