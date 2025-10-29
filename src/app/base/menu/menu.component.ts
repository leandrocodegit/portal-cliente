import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Menu } from 'src/app/base/models/modulo.model';
import { AuthService } from '@/auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../services/layout.service';
import { TooltipModule } from 'primeng/tooltip';
import { LoadService } from '@/shared/components/preload/load.service';
import { AppMenuitem } from '../sidebar/app.menuitem';
import { Popover, PopoverModule } from 'primeng/popover';
import { Protocolo } from '@/shared/models/protocolo.model';
import { Subject } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PublicoService } from '@/shared/services/publicos.service';

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
    PopoverModule
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
      items: [{ label: 'Meus Protocolos', icon: 'pi pi-fw pi-ticket', separator: false, routerLink: ['/'] }]
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
    private readonly publicoService: PublicoService,
    private readonly router: Router

  ) {
  }

  ngOnInit(): void {

    let servico = {
      order: 3,
      label: '',
      items: [
        {
          label:
            'Serviços',
          icon: 'pi pi-fw pi-briefcase',
        }
      ]
    };

    let servicos: any[] = [];
    this.publicoService.listaPaginasPublicas().subscribe(response => {

      response.forEach(pagina => {
        servicos.push(
          {
            label: pagina.nome,
            icon: 'pi pi-minus',
            routerLink: [`/servicos/${pagina.id}`]
          })
      })
    })

    servico.items[0]['items'] = servicos;
    this.model.push(servico)

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
}
