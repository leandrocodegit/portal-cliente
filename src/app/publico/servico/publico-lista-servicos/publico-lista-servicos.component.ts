import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridServicosComponent } from '@/shared/components/grid-servicos/grid-servicos.component';
import { PaginaServico } from '@/shared/models/pagina-servico.model';
import { PublicoService } from '@/shared/services/publicos.service';
@Component({
  selector: 'app-publico-lista-servicos',
  imports: [
    GridServicosComponent
  ],
  templateUrl: './publico-lista-servicos.component.html',
  styleUrl: './publico-lista-servicos.component.scss'
})
export class PublicoListaServicosComponent implements OnInit {

   protected paginaServico: PaginaServico;

    constructor(
      private readonly publicoService: PublicoService,
      private readonly activeRoute: ActivatedRoute,
      private router: Router
    ) { }

    ngOnInit(): void {
      this.activeRoute.params.subscribe(param => {
        if (param['id'])
          this.publicoService.buscarPaginaServico(param['id']).subscribe(response => {
            this.paginaServico = response;
          });
      });
    }

     iniciarServico(servico: any) {
    this.router.navigate([`/embedded/formulario/${servico.id}/${servico.formKey}`, {'redirect': this.paginaServico.redirect}]);
  }
  }
