import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Menu } from 'src/app/base/models/modulo.model';
import { AuthService } from '@/auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { GerarProtocoloComponent } from '@/modulos/servicos/gerar-protocolo/gerar-protocolo.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LayoutService } from '../services/layout.service';
import { TooltipModule } from 'primeng/tooltip';
import { LoadService } from '@/shared/components/preload/load.service';
import { PermissaoEnum } from '@/shared/models/grupo-permissao.enum';
import { ProtocoloService } from '@/shared/services/protocolo.service';
import { AppMenuitem } from '../sidebar/app.menuitem';
import { Popover, PopoverModule } from 'primeng/popover';
import { Protocolo } from '@/shared/models/protocolo.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { InstanciaService } from '@/shared/services/process-instance.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    AppMenuitem,
    RouterModule,
    SelectModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    PopoverModule,
    DatePipe
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class AppMenu implements OnInit {

  protected tenants: any[] = [];
  protected tenant: any;
  protected model: Menu[] = [
    {
      order: 0,
      label: '',
      items: [{ label: 'Meus Protocolos', icon: 'pi pi-fw pi-home', separator: false, routerLink: ['/'] }]
    },
    {
      order: 3,
      label: '',
      items: [{ label: 'Serviços', icon: 'pi pi-briefcase', separator: false, routerLink: ['/servicos/932706af-e8f3-4125-8ee1-39553bf53fcb'] }]
    },

  ];
  protected filteredProtocolos: any[] = [];
  protected protocolo;
  protected protocoloResult?: Protocolo;
  protected nomeFind = new Subject<string>();
  protected event?: any;
  @ViewChild('op') op!: Popover;


  constructor(
    public readonly loadService: LoadService,
    private readonly authService: AuthService,
    public readonly layoutService: LayoutService,
    private readonly dialogService: DialogService,
    private readonly protocoloService: ProtocoloService,
    private readonly instanciaService: InstanciaService,
    private readonly router: Router

  ) {
    this.nomeFind.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        this.protocolo = value
        if (value?.length > 7) {
          this.pesquisarProtocolo()
        }
      });
  }

  ngOnInit(): void {
    if (this.authService.hasGrupo(PermissaoEnum.ADM))

      this.model = this.model.sort((a, b) => a.order - b.order);

    this.filteredProtocolos.push({
      "protocolo": {
        "numeroProtocolo": "A00000071",
        "tenant": "simod"
      },
      "dataCriacao": "2025-08-09T17:24:17.09017",
      "servicoId": "Process_2:16:2f182afe-73ab-11f0-abf0-0242ac170007",
      "id": "ad6d9aee-7545-11f0-abf0-0242ac170007",
      "deploymentId": "2f0f2a4a-73ab-11f0-abf0-0242ac170007",
      "descricaoServico": "Teste",
      "vencimento": "2025-08-09T17:24:17.170551",
      "configuracaoProtocolo": null
    })
  }


  saveEvent(event: any) {
    this.event = event;
  }

  selectTenant(event: any) {
    this.tenant = event.value;
    sessionStorage.setItem("X-Tenant-ID", this.tenant);
  }

  pesquisarProtocolo(event?: any) {
    if (this.protocolo.length > 7 && this.protocolo != this.protocoloResult?.protocolo?.numeroProtocolo) {
      this.protocoloService.buscarProtocolo(this.protocolo).subscribe(response => {
        if (response?.protocolo?.numeroProtocolo && response?.protocolo?.numeroProtocolo != this.protocoloResult?.protocolo?.numeroProtocolo) {
          this.protocoloResult = response;
          this.op.show(this.event)
        }

      })
    }
    else this.op.toggle(this.event)
  }

  gerarProtocolo() {
    this.dialogService.open(GerarProtocoloComponent, {
      modal: true,
    });
  }

  abrirProtocolo() {
    this.instanciaService.buscarInstanciaPorProtocolo(this.protocoloResult.protocolo.numeroProtocolo).subscribe(response => {
      if (response.length && response[0]?.businessKey) {
        this.op.hide();
        this.router.navigate([`/painel/protocolo/${response[0].businessKey}/detalhes/${response[0].id}`]);
      }
    })
  }
}
