import { LayoutService } from '@/base/services/layout.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-filtro-categorias',
  imports: [
    FormsModule,
    SelectModule,
    ButtonModule,
    TieredMenu
  ],
  templateUrl: './filtro-categorias.component.html',
  styleUrl: './filtro-categorias.component.scss'
})
export class FiltroCategoriasComponent implements OnChanges {

  @Input() categorias: any[] = [];
  @Output() selectEmit = new EventEmitter();

  private categoria?: any;
  protected itens: any[] = [{}];

  constructor(public readonly layoutService: LayoutService){}

  ngOnChanges(): void {
    if (this.categorias)
      this.itens = this.categorias.map((categoria: any) => {
        return {
          label: categoria,
          icon: 'pi ' + (this.categoria == categoria ? 'pi-check-circle' : 'pi-circle'),
          command: () => {
            this.categoria = categoria;
            this.selectEmit.emit(categoria);
            this.ngOnChanges();
          }
        }
      })
  }
}
