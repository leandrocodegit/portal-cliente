import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrupoService } from 'src/app/shared/services/grupo.service';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';
import { DialogService } from 'primeng/dynamicdialog';
import { FormularioGrupoComponent } from '../formulario-grupo/formulario-grupo.component';

@Component({
  selector: 'app-lista-grupos',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent
  ],
  templateUrl: './lista-grupos.component.html',
  styleUrl: './lista-grupos.component.scss'
})
export class ListaGruposComponent implements OnInit {

  protected cols: any = [
    { header: 'Nome', field: 'description' }
  ]

  protected itens: any[] = [];

  constructor(
    private readonly grupoService: GrupoService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.listarGrupos();
  }

  listarGrupos() {
    this.grupoService.listaGrupos(TipoGrupo.DEPARTMENT).subscribe(response => {
      this.itens = response;
    })
  }

  editar(event?: any) {
    this.dialogService.open(FormularioGrupoComponent, {
      data: event,
      modal: true,
    }).onClose.subscribe(() => this.listarGrupos())
  }

  sincronizarGrupo(event: any) {
    event.id = event.id.replaceAll('-', '');
    this.grupoService.criarGrupo(event, TipoGrupo.DEPARTMENT).subscribe(() => {
      this.listarGrupos();
    });

  }

  removerGrupo(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente remover esse grupo?',
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
        this.grupoService.removerGrupo(event).subscribe(() => {
          this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'Grupo foi removido' });
          this.listarGrupos();
        }, error => {

        })
      }
    });
  }

}
