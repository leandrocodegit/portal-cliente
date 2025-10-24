import { DetalhesInstanciaComponent } from '@/modulos/processo/detalhes-instancia/detalhes-instancia.component';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { TipoDrawer } from './tipo-drawers.enum';
import { ReabrirProtocoloComponent } from '@/modulos/servicos/reabrir-protocolo/reabrir-protocolo.component';
import { CardModule } from 'primeng/card';
import { ListaDocumentosComponent } from '@/modulos/tarefas/lista-documentos/lista-documentos.component';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';
import { IdentityService } from '@/shared/services/identity.service';
import { TituloCurtoComponent } from '@/shared/components/titulo-curto/titulo-curto.component';
import { DescricaoTarefaComponent } from '@/modulos/tarefas/descricao-tarefa/descricao-tarefa.component';

@Component({
  selector: 'app-drawers',
  imports: [
    DrawerModule,
    DetalhesInstanciaComponent,
    ReabrirProtocoloComponent,
    ListaDocumentosComponent,
    TimelineModule,
    CardModule,
    DatePipe,
    TituloCurtoComponent,
    DescricaoTarefaComponent
  ],
  templateUrl: './drawers.component.html',
  styleUrl: './drawers.component.scss'
})
export class DrawersComponent {

  protected comentarios: any[] = [];
  protected data?: any = {};

  constructor(
      protected readonly instanciaService: InstanciaService,
      public readonly identityService: IdentityService
    ) {

      instanciaService.detalhesInstancia$.subscribe((data: any) => {
        this.data = data;
        this.data.instanceId = data.instanceId;
        if(data.tipo == TipoDrawer.INSTANCE){
          this.data.isInstance = data.view;
        }else  this.data.isInstance = false;
        if(data.tipo == TipoDrawer.REABRIR_PROTOCOLO){
          this.data.isReabrirProtocolo = data.view;
        }else  this.data.isReabrirProtocolo = false;
         if(data.tipo == TipoDrawer.VISUALIZAR_ARQUIVOS){
          this.data.isVisualizarArquivos = data.view;
        }else  this.data.isVisualizarArquivos = false;
        if(data.tipo == TipoDrawer.COMENTARIOS){
          this.data.isComentarios = data.view;
          this.listaComentarios(this.data.instanceId)
        }else  this.data.isComentarios = false;
        if(data.tipo == TipoDrawer.DETALHES_TAREFA){
          this.data.isDetalhesTarefa = data.view;
        }else  this.data.isDetalhesTarefa = false;

      });
    }

    listaComentarios(instanceId: any) {
    this.instanciaService.comentariosInstancia(instanceId).subscribe(response => {
      this.comentarios = response;
    });
  }

}
