import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrupoService } from 'src/app/shared/services/grupo.service';
import { GrupoSignatarioService } from '@/shared/services/grupo-signatario.service';
import { Router } from '@angular/router';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';
import { FormularioGrupoSignatarioComponent } from '../formulario-grupo-signatario/formulario-grupo-signatario.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-lista-grupos-signatarios',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent,
    FormularioGrupoSignatarioComponent,
    DialogModule
  ],
  templateUrl: './lista-grupos-signatarios.component.html'
})
export class ListaGruposSignatariosComponent implements OnInit {

  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  protected colsSignatarios: any = [
    { header: 'Descrição', field: 'description' },
    { header: 'Id', field: 'id'}
  ];

  protected signatarios: any[] = [];
  protected grupoSelect?: any;

  constructor(
    private readonly grupoService: GrupoService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.listarGrupos();
  }

  protected listarGrupos() {
    this.grupoService.listaGrupos(TipoGrupo.SIGNER).subscribe(response => {
      this.signatarios = response;
    });
  }

  editarGrupo(event: any) {
    this.grupoSelect = event;
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
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, remover',
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
