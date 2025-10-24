import { AuthService } from '@/auth/services/auth.service';
import { RelatorioService } from '@/shared/services/relatorio.service';
import { baixar } from '@/shared/services/util/FileUtil';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-imprimir',
  imports: [
    ButtonModule,
    TieredMenu
  ],
  templateUrl: './imprimir.component.html',
  styleUrl: './imprimir.component.scss'
})
export class ImprimirComponent {

  @Input() query: any;
  @Input() isRelatorio = false;
  @Output() printEmit = new EventEmitter();

  protected items: any[] = [
    {
      label: 'Exportar relatório',
      icon: 'pi pi-print',
      items: [
        {
          label: 'Pdf',
          icon: 'pi pi-file-pdf',
          command: () => {
            this.imprimir('PDF');
          }
        },
        {
          label: 'Word',
          icon: 'pi pi-file-word',
          command: () => {
            this.imprimir('WORD');
          }
        },
        {
          label: 'Excel',
          icon: 'pi pi-file-excel',
          command: () => {
            this.imprimir('EXCEL');
          }
        },
        {
          label: 'Power Point',
          icon: 'pi pi-file-check',
          command: () => {
            this.imprimir('POWER_POINT');
          }
        },
        {
          label: 'CSV',
          icon: 'pi pi-file-export',
          command: () => {
            this.imprimir('CSV');
          }
        }
      ]
    }];

  constructor(
    private readonly relatorioService: RelatorioService,
    private readonly authService: AuthService
  ) { }


  imprimir(formato: any) {
    if (this.isRelatorio) {
      this.query.info.formato = formato;
      const user = this.authService.getUserSession();
      this.query.info.origem = user.name;
      this.query.info.descricao = user.email;
      this.query.info.status = '- - -'
      this.relatorioService.imprimirRelatorioInstancia(this.query).subscribe(data => {
        baixar(data)
      });
    } else {
      this.printEmit.emit(formato);
    }
  }
}
