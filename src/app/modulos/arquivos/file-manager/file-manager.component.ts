import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG para ícones e estilo
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';

// Interface para definir a estrutura de um item no gerenciador de arquivos
interface FileSystemItem {
  name: string;
  type: 'folder' | 'file';
  icon: string;
}

@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TooltipModule,
    TituloPesquisaComponent
  ],
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  // Lista de arquivos e pastas para exibição
  protected items: FileSystemItem[] = [];

  constructor() { }

  ngOnInit(): void {
    // Dados de exemplo para simular um diretório
    this.items = [
      { name: 'Documentos', type: 'folder', icon: 'pi pi-folder-open' },
      { name: 'Imagens', type: 'folder', icon: 'pi pi-folder-open' },
      { name: 'Músicas', type: 'folder', icon: 'pi pi-folder-open' },
      { name: 'Relatório Anual.pdf', type: 'file', icon: 'pi pi-file-pdf' },
      { name: 'Planilha_Vendas.xlsx', type: 'file', icon: 'pi pi-file-excel' },
      { name: 'Apresentação.pptx', type: 'file', icon: 'pi pi-file-word' },
      { name: 'logo.png', type: 'file', icon: 'pi pi-image' },
      { name: 'rascunho.txt', type: 'file', icon: 'pi pi-file' },
    ];
  }

  /**
   * Função para lidar com o clique em um item.
   * Em uma aplicação real, aqui entraria a lógica para abrir a pasta ou o arquivo.
   * @param item O item que foi clicado.
   */
  onItemClick(item: FileSystemItem): void {
    if (item.type === 'folder') {
      console.log(`Abrindo a pasta: ${item.name}`);
      // Lógica para navegar para dentro da pasta
    } else {
      console.log(`Abrindo o arquivo: ${item.name}`);
      // Lógica para abrir/baixar o arquivo
    }
  }

}
