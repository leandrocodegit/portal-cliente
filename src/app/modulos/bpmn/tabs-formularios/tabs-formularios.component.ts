import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { Location } from '@angular/common';
import { PainelRouteBaseComponent } from '@/shared/components/painel-route-base/painel-route-base.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs-formularios',
  imports: [
    TabsModule,
    RouterModule,
    PainelRouteBaseComponent
  ],
  templateUrl: './tabs-formularios.component.html',
  styleUrl: './tabs-formularios.component.scss'
})
export class TabsFormulariosComponent implements OnInit {

  @Input() tab = 'form';
  protected subjectForm: Subscription;

  constructor(
    private readonly formularioService: FormularioService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {

    this.subjectForm = formularioService.reload.subscribe((data) => {
      this.tab = data;
    });
  }


  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      this.tab = param['tipo'] ?? 'form';
    })
  }

  selectTab(event: any) {

    this.tab = event;
    if (this.tab == 'deploy') {
      event = 'deploy/implantacoes'
    } else {
      this.formularioService.reload.emit(event);
    }
    console.log(event);

    this.location.go(`/painel/configuracoes`);
    this.router.navigate([`/painel/configuracoes/${event}`], { queryParams: { tipo: event } });

  }

}
