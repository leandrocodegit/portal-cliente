import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { FormularioService } from '@/shared/services/formulario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tools',
  imports: [
    ButtonModule,
    TooltipModule,
    SelectModule,
    FormsModule
  ],
  templateUrl: './edit-tools.component.html',
  styleUrl: './edit-tools.component.css'
})
export class EditToolsComponent implements OnInit {

  @Output() voltarEmit = new EventEmitter();
  @Output() onUndo = new EventEmitter();
  @Output() onRedo = new EventEmitter();
  @Output() onZoomReset = new EventEmitter();
  @Output() onZoomIn = new EventEmitter();
  @Output() onZoomOut = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onDownloadXml = new EventEmitter();
  @Output() onDownloadSvg = new EventEmitter();
  @Output() onImportXml = new EventEmitter();
  @Output() onViewXml = new EventEmitter();
  @Output() updateVersao = new EventEmitter();
  @Input() formulario: any;

  protected versoes: any[] = [];

  constructor(
    private readonly formularioService: FormularioService) { }

  ngOnInit(): void {
    if(this.formulario?.id)
    this.listaVersoesFormularios(this.formulario?.id);
  }

  listaVersoesFormularios(id: string) {
      this.formularioService.listaVersoesFormularios(id, true).subscribe(response => {
        this.versoes = response;
      });
  }

  _onUndo() {
    this.onUndo.emit();
  }
  _onRedo() {
    this.onRedo.emit();
  }
  _onZoomReset() {
    this.onZoomReset.emit();
  }
  _onZoomIn() {
    this.onZoomIn.emit();
  }
  _onZoomOut() {
    this.onZoomOut.emit();
  }
  _onSave() {
    this.onSave.emit();
  }
  _onDownloadXml() {
    this.onDownloadXml.emit();
  }
  _onDownloadSvg() {
    this.onDownloadSvg.emit();
  }

  _onImportXml() {
    this.onImportXml.emit();
  }

  _onViewXml() {
    this.onViewXml.emit();
  }

  _updateVersao() {
    this.updateVersao.emit(this.formulario.id);
  }

  voltar() {
    this.voltarEmit.emit();
  }
}
