import { TopBarComponent } from '@/base/top-bar/top-bar.component';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-painel-conta',
  imports: [
    RouterModule,
    TopBarComponent,
    BreadcrumbModule
  ],
  templateUrl: './painel-conta.component.html',
  styleUrl: './painel-conta.component.scss'
})
export class PainelContaComponent  implements OnInit {

  protected items: MenuItem[] | undefined;
  protected home: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Meus Protocolos', route: '/' },
            { label: 'Minha Conta', route: '/' },
            { label: 'Accessories' },
            { label: 'Keyboard' },
            { label: 'Wireless' }
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}
