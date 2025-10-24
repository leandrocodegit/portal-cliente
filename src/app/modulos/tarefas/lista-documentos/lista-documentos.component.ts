import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AccordionModule } from 'primeng/accordion';
import { ReproduzirArquivosComponent } from 'src/app/shared/components/reproduzir-arquivos/reproduzir-arquivos.component';
import { DataView, DataViewModule } from 'primeng/dataview';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { FilesTarefaService } from 'src/app/shared/services/files-tarefa.service';
import { LayoutService } from '@/base/services/layout.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { SkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { ConfirmationService } from 'primeng/api';
import { ImagePreloadComponent } from '@/shared/components/image-preload/image-preload.component';

@Component({
  selector: 'app-lista-documentos',
  imports: [
    CommonModule,
    AccordionModule,
    ReproduzirArquivosComponent,
    MessageModule,
    ButtonModule,
    ProgressBarModule,
    SelectButtonModule,
    FormsModule,
    DataView,
    DrawerModule,
    SkeletonComponent,
    ImagePreloadComponent
  ],
  templateUrl: './lista-documentos.component.html',
  styleUrl: './lista-documentos.component.scss'
})
export class ListaDocumentosComponent implements OnInit {

  @Input() tarefa: any;
  @Input() files: any = [];
  @Input() isInstance = false;
  @Input() grid = false;
  @Input() todos = false;
  @Input() documentos = false;
  @Input() anexos = false;
  @Input() viewDelete = true;
  protected itemSelect = 0;
  protected isLoad = false;
  protected isLoadFiles:any = {};
  protected viewArquivo = false;
  protected fileSelect?: any;
  protected cols: any = [
    { header: 'Nome', field: 'name' }

  ];
  protected layout: 'list' | 'grid' = 'grid';
  protected options = ['list', 'grid'];
  protected filtroSelect: any;
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };


  constructor(
    private readonly filesTarefaService: FilesTarefaService,
    private readonly confirmationService: ConfirmationService,
    private readonly sanitizer: DomSanitizer,
    public readonly layoutService: LayoutService
  ) { }
  ngOnInit(): void {
    this.carregarLista();
  }

  listaAnexosInstancia() {
    this.isLoadFiles.anexos = true;
    this.filesTarefaService.listaAnexosInstancia(this.tarefa.processInstanceId).subscribe(response => {
      if (this.todos)
        response.forEach(file => this.files.push(file));
      else this.files = response;
      this.isLoadFiles.anexos = false;
    }, error => this.isLoadFiles.anexos = false);
  }

  listaAnexos() {
    this.isLoadFiles.anexos = true;
    this.filesTarefaService.listaAnexos(this.tarefa.id).subscribe(response => {
      this.files = response;
      this.isLoadFiles.anexos = false;
    }, error => this.isLoadFiles.anexos = false);
  }

  select(file: any) {
    this.fileSelect = file;
    file.view = !file?.view;
    this.viewArquivo = true;
  }

  carregarLista() {
    if (this.isInstance) {
      if (this.documentos || this.todos)
        this.listaDocumentos();
      if (this.anexos || this.todos)
        this.listaAnexosInstancia();
    }
    else {
      this.listaAnexos();
    }
  }

  listaDocumentos() {
    this.isLoadFiles.documentos = true
    this.filesTarefaService.listaVariaveisInstancia(this.tarefa?.processInstanceId).subscribe(response => {
      const resultFiles = response.filter(file => file.type == 'File').map(file => {
        return {
          id: file.id,
          name: file.valueInfo.filename,
          varName: file.name,
          type: file.valueInfo.mimeType,
          processInstanceId: file.processInstanceId,
          host: file.host,
          thumbail: file.thumbail,
          key: file.key
        }
      })
      if (this.todos)
        resultFiles.forEach(file => this.files.push(file));
      else this.files = resultFiles;
      this.isLoadFiles.documentos = false;
    }, error => this.isLoadFiles.documentos = false);
  }

  excluir(data: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Remover arquivo?',
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
        severity: 'danger',
        label: 'Sim, remover',
      },
      accept: () => {
        if (this.isInstance) {
          this.filesTarefaService.removerVariavelInstance(data.processInstanceId, data.varName).subscribe(() => {
            this.carregarLista();
          });
        } else {
          this.filesTarefaService.removerAnexo(data.taskId, data.id).subscribe(() => {
            this.carregarLista();
          });
        }
      }
    });

  }

  getThumbail(file: any) {
    if (file?.thumbail)
      return file.thumbail
    if (file.type.startsWith('video'))
      return 'assets/icons/icons8-vídeo-96.png';
    return 'assets/icons/icons8-pasta-94.png';
  }

  download(data: any) {
    this.isLoad = true;
    this.filesTarefaService.downloadAnexo(data.key).subscribe(file => {
      this.baixar(file, data.name);
      this.isLoad = false;
    }, erro => {
      this.isLoad = false;
    });
  }

  baixar(data: Blob, name: string) {
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  isVisual(file: any) {
    return file.type.includes('pdf') || file.type.includes('video') || file.type.includes('audio') || file.type.includes('image')
  }
}
