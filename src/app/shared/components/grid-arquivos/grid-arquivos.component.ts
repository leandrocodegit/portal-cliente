import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReproduzirArquivosComponent } from '../reproduzir-arquivos/reproduzir-arquivos.component';

@Component({
  selector: 'app-grid-arquivos',
  imports: [
    CommonModule,
    ReproduzirArquivosComponent
  ],
  templateUrl: './grid-arquivos.component.html',
  styleUrl: './grid-arquivos.component.scss'
})
export class GridArquivosComponent {

  @Input() files: any = [];

    isVideo(type: any) {
    if (type?.includes('video'))
      return true;
    return false;
  }

  removeItem(item: any) {
}

playVideo(url: string) {
  // exemplo: abrir modal ou nova janela
  window.open(url, '_blank');
}
}
