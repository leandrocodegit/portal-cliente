import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PainelRouteBaseComponent } from '@/shared/components/painel-route-base/painel-route-base.component';

@Component({
  selector: 'app-painel-usuario',
  imports: [
    RouterModule,
    PainelRouteBaseComponent
  ],
  templateUrl: './painel-usuario.component.html',
  styleUrl: './painel-usuario.component.scss'
})
export class PainelUsuarioComponent {}
