import { StartProcessoComponent } from '@/modulos/bpmn/deploy/start-processo/start-processo.component';
import { DownloadService } from '@/shared/services/download.service';
import { FilesTarefaService } from '@/shared/services/files-tarefa.service';
import { LixeiraService } from '@/shared/services/lixeira.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ProcessoService } from 'src/app/shared/services/processo.service';


@Component({
  selector: 'app-lista-lixeira',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent,
    DialogModule,
    DatePickerModule,
    FormsModule,
    CheckboxModule,
    ButtonModule
  ],
  templateUrl: './lista-lixeira.component.html',
  styleUrl: './lista-lixeira.component.scss'
})
export class ListaLixeiraComponent implements OnInit {

  protected cols: any = [
    { header: 'Variável', field: 'name', isCopy: true },
     { header: 'Arquivo', field: 'url' },
    { header: 'Data criação', field: 'dataCriacao', isTime: true },
    { header: 'Instância', field: 'instanceId', isCopy: true },
  ]
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  protected lixeiras: any[] = [];

  constructor(
    private readonly lixeiraService: LixeiraService,
    private readonly filesTarefaService: FilesTarefaService,
    private readonly downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.listaLixeiras();
  }

  listaLixeiras() {
    this.lixeiraService.listaLixeiras().subscribe(response => {
      this.lixeiras = response;
    });
  }

 download(value: any) {
    this.filesTarefaService.downloadAnexo(`forms/${value.instanceId}/${value.url}`).subscribe(file => {
      this.downloadService.baixar(file, `forms/${value.instanceId}/${value.url}`);
    });
  }
}


