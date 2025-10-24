import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormularioConectorComponent } from '../formulario-conector/formulario-conector.component';
import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ConectorService } from '@/shared/services/conector.service';
import { TabsModule } from 'primeng/tabs';
import { ConfirmationService } from 'primeng/api';
import { Conector } from '@/shared/models/conector.model';
import { DrawerModule } from 'primeng/drawer';
import { EditorJsonComponent } from '../editor-json/editor-json.component';

@Component({
  selector: 'app-lista-conectores',
  imports: [
    DialogModule,
    FormularioConectorComponent,
    TabelaComponent,
    TituloPesquisaComponent,
    TabsModule,
    DrawerModule,
    EditorJsonComponent
  ],
  templateUrl: './lista-conectores.component.html',
  styleUrl: './lista-conectores.component.scss'
})
export class ListaConectoresComponent implements OnInit {

  protected tab = 'chamadas';
  protected visible = false;
  protected visualizarJson = false;
  protected colsConectores: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Url', field: 'url' },
    { header: 'Enpoint', field: 'endpoint' },
    { header: 'Metodo', field: 'metodo' },
    { header: 'Prefixo', field: 'prefixo' },
    { header: 'Status', field: 'status', isStatusHttp: true },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Id', field: 'id' },
  ];

  protected conectores: any[] = [];
  protected conectoresAuth: any[] = [];
  protected conectorSelecionado?: Conector;
  protected json?: any;

  constructor(
    private readonly conectorService: ConectorService,
    private readonly confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.listaConectores();
    this.listaConectoresAuth();
  }

  listaConectores() {
    this.conectorService.listaConectores(false).subscribe(response => {
      this.conectores = response;
    });
  }

  listaConectoresAuth() {
    this.conectorService.listaConectores(true).subscribe(response => {
      this.conectoresAuth = response;
    });
  }

  editar(value: any) {

  }

  configurar(value: any) {
    this.conectorSelecionado = value;
    this.visible = true;
  }

  novoConector() {
    this.conectorSelecionado = new Conector;
    this.visible = true;
  }

  executar(value: any) {
    this.conectorService.executarConector(value.id).subscribe(response => {
      this.listaConectores();
    });
  }

  habilitar(value: any) {
    this.conectorService.enabledConector(value.id).subscribe(() => {
      this.listaConectores();
    });
  }

  remover(id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Ao remover esse conector, processos vinculados precisam ser atualizados!',
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
        severity: 'danger',
        label: 'Sim, remover',
      },
      accept: () => {
        this.conectorService.removerConector(id).subscribe(() => {
          this.listaConectores();
          this.listaConectoresAuth();
        }
        );
      }
    });

  }

  selectTab(value: any) {
    this.tab = value;
  }

  visualizarCodigoJson(value: any) {
    this.json = JSON.parse(value.response);
    this.visualizarJson = true;
  }

  fechar(value: any) {
    this.visible = false;
    if (value)
      for (let index = 0; index < this.conectores.length; index++) {
        const element = this.conectores[index];
        if (element.id == value.id) {
          this.conectores[index] = value;
          break;
        }
      }
  }
}
