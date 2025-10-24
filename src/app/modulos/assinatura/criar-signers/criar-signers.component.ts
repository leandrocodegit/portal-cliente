import { Component } from '@angular/core';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Signatario } from '@/shared/models/signatario.model';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigurarSignerComponent } from '../configurar-signer/configurar-signer.component';

@Component({
  selector: 'app-criar-signers',
  imports: [
    DragDropModule,
    TooltipModule,
    DynamicDialogModule
  ],
  templateUrl: './criar-signers.component.html',
  styleUrl: './criar-signers.component.scss'
})
export class CriarSignersComponent {

  protected signatarios: Signatario[] = [
    {
      id: '',
      ordem: 1,
      email: 'lpoliveira.ti@gmail.com',
      nome: 'Leandro 1'
    },
    {
      id: '',
      ordem: 2,
      email: 'lpoliveira.ti@gmail.com',
      nome: 'Leandro 2'
    }
  ];
  protected dragActive: boolean = false;
  protected ref: DynamicDialogRef | undefined;

  constructor(private readonly dialogService: DialogService) { }

  onDragStart() {
    this.dragActive = true;
  }

  onDragEnd() {
    this.dragActive = false;
  }

  drop(event: any) {
    moveItemInArray(this.signatarios, event.previousIndex, event.currentIndex);
    this.signatarios.forEach((sig, index) => sig.ordem = index + 1);
  }

  editar(signatario: Signatario) {
    this.ref = this.dialogService.open(ConfigurarSignerComponent, {
      data: signatario,
      header: ''
    });
  }
}
