import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModeloService } from 'src/app/shared/services/modelo.service';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ProcessoService } from '@/shared/services/processo.service';

@Component({
  selector: 'app-formulario-modelos',
  imports: [
    FormsModule,
    FormularioModule,
    TituloCurtoComponent,
    VoltarSalvarComponent,
    FileUploadModule,
    SelectModule
  ],
  templateUrl: './formulario-modelos.component.html',
  styleUrl: './formulario-modelos.component.scss'
})
export class FormularioModelosComponent implements OnInit {

  @Output() voltarEmit = new EventEmitter();
  @Output()updateEmit = new EventEmitter();
  @Input() tab: any;
  @Input() modelo?: any;
  protected fileModelo: File | null;
  protected modelos: { descricao: any }[] = [];
  protected processos: any[] = [];
  protected versoes: any[] = [];


  constructor(
    private readonly modeloService: ModeloService,
    private readonly processoService: ProcessoService
  ) { }

  ngOnInit(): void {

    if (!this.modelo) {
      this.modelo = {
        descricao: '',
        documento: {
          descricao: ''
        },
        processDefinitionKey: ''
      }
    }

    if (this.tab == 'signatarios') {
      this.listarModelos();
      this.listaProcessos();
      if (this.modelo.processDefinitionKey)
        this.listaProcessosPorKey();
    }
  }

  salvarModelo(event: any) {
    if (event?.files.length)
      this.fileModelo = event.files[0];
    this.modeloService.salvarModelo(this.modelo, this.fileModelo).subscribe(response => {
      this.modelo = response;
      this.updateEmit.emit();
    }, error => {
    });
  }

  salvarModeloSignatario() {
    var versao = this.versoes.find(ver => ver.version == this.modelo.version);
    this.modelo.processDefinitionId = versao.id;
    this.modelo.processDefinitionKey = this.modelo.processDefinitionKey;
    this.modelo.version = this.modelo.version;
    this.modeloService.salvarModeloSignatario(this.modelo).subscribe(response => {
      this.modelo = response;
      this.updateEmit.emit();
    }, error => {
    });
  }

  listarModelos() {
    this.modeloService.listaModelos().subscribe(response => {
      this.modelos = response;
    })
  }

  listaProcessos() {
    this.processoService.listarProcessos().subscribe(response => {
      this.processos = Array.from(
        new Map(response.map(item => [item.key, item])).values()
      );
    });
  }

  listaProcessosPorKey() {
    this.processoService.listarProcessosByKey(this.modelo.processDefinitionKey).subscribe(response => {
      this.versoes = response.sort((a, b) => b.version - a.version);
      if (this.modelo.processDefinitionKey && !this.versoes.length)
        this.listaProcessosPorKey();
    });
  }

  getVersoes(key: string) {
    return this.processos.filter(proc => proc.key == key)
  }

  fechar() {
  this.voltarEmit.emit();
  }
}
