import { Servico } from '@/shared/models/servico.model';
import { HistoryService } from '@/shared/services/history.service';
import { ServicoService } from '@/shared/services/servico.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { ProtocoloService } from 'src/app/shared/services/protocolo.service';

@Component({
  selector: 'app-gerar-protocolo',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    SelectModule,
    ButtonModule,
    TituloCurtoComponent,
    ProgressBarModule
  ],
  providers: [
    DialogService
  ],
  templateUrl: './gerar-protocolo.component.html',
  styleUrl: './gerar-protocolo.component.scss'
})
export class GerarProtocoloComponent implements OnInit {

  protected servicos: Servico[] = [];
  protected servicoSelecionado: Servico;
  protected viewGerarProtocolo = false;
  protected loadingServicos = false;
  protected loadProtocolo = false;

  constructor(
    private readonly protocoloService: ProtocoloService,
    private readonly servicoService: ServicoService,
    private readonly historyService: HistoryService,
    private readonly ref: DynamicDialogRef,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.listaServicos();
  }

  listaServicos() {
    this.loadingServicos = true;
    this.servicoService.listarServicos().subscribe(response => {
      this.servicos = response;
      this.loadingServicos = false;
    }, error => this.loadingServicos = false);
  }

  gerarProtocolo() {
    this.loadProtocolo = true;
    this.protocoloService.gerarProtocolo(this.servicoSelecionado).subscribe(response => {
      this.loadProtocolo = false;
      this.historyService.listarTasksInstancia(response.id).subscribe(result => {
        this.router.navigate([`/painel/tarefa/detalhes/${result[0].id}`]);
      }, error => {
         this.router.navigate([`painel/protocolo/${response.protocolo.numeroProtocolo}/detalhes/${response.id}`]);
      });
      this.fechar()
    }, error => this.loadProtocolo = false);
  }

  fechar() {
    this.ref.close()
  }

}
