import { FormularioService } from '@/shared/services/formulario.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-selecionar-versao-formulario',
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './selecionar-versao-formulario.component.html',
  styleUrl: './selecionar-versao-formulario.component.scss'
})
export class SelecionarVersaoFormularioComponent implements OnInit {

  @Output() addEmit = new EventEmitter();
  @Output() fecharEmit = new EventEmitter();
  @Input() formularios: any[] = [];
  @Input() view = false;
  @Input() formulariosSelect: Map<string, any> = new Map();

  constructor(
    private readonly formularioService: FormularioService
  ) { }

  ngOnInit(): void {
    if (!this.view)
      this.listaFormularios();
  }

  listaFormularios() {
    this.formularioService.listaFormularios('FORM', true).subscribe(response => {
      this.formularios = response;
    }, error => { });
  }

  adicionar(value: any) {
    if (this.formulariosSelect.has(value.id))
      this.formulariosSelect.delete(value.id)
    else this.formulariosSelect.set(value.id, value)
  }
}
