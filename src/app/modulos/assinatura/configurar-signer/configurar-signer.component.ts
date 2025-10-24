import { Signatario } from '@/shared/models/signatario.model';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-configurar-signer',
  imports: [
    FormsModule,
    InputText,
    CheckboxModule
  ],
  templateUrl: './configurar-signer.component.html',
  styleUrl: './configurar-signer.component.scss'
})
export class ConfigurarSignerComponent {

  protected signatario: Signatario;
  protected checked = false;

  constructor(
   public readonly config: DynamicDialogConfig
    ) {
       this.signatario = config.data;
    }

}
