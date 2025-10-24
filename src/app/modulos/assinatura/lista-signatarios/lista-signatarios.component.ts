import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { CORES } from './cores';
import { PosicaoAssinatura, Preferencias } from '@/shared/models/PosicaoAssinatura';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

var cores: Map<string, boolean> = CORES;

@Component({
  selector: 'app-lista-signatarios',
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    TooltipModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './lista-signatarios.component.html',
  styleUrl: './lista-signatarios.component.scss'
})
export class ListaSignatariosComponent implements OnInit, OnDestroy {

  @Input() signatarios: PosicaoAssinatura[] = [];
  @Input() signatarioSelecionado?: PosicaoAssinatura;
  @Input() posicoes: Map<number, Map<any, any>> = new Map();
  @Input() lock: any;
  @Output() selecionarSignatarioEmit = new EventEmitter();
  @Output() removerSignatario = new EventEmitter();

  protected preferencias = new Preferencias();

  protected tiposAssinatura: any[] = [
    { nome: 'Assinar', value: '1' },
    { nome: 'Aprovar', value: '2' },
    { nome: 'Reconhecer', value: '3' },
    { nome: 'Assinar como parte', value: '4' },
    { nome: 'Assinar como testemunha', value: '5' },
    { nome: 'Assinar como interveniente', value: '6' },
    { nome: 'Acusar recebimento', value: '7' },
    { nome: 'Assinar como Emissor, Endossante e Avalista', value: '8' },
    { nome: 'Assinar como Emissor, Endossante, Avalista, Fiador', value: '9' },
    { nome: 'Assinar como fiador', value: '10' },
    { nome: 'ApAssinar como parte e fiadorrovar', value: '11' },
    { nome: 'Assinar como responsável solidário', value: '12' },
    { nome: 'Assinar como parte e responsável solidário', value: '13' }
  ]

  protected tiposCertificado: any[] = [
    { nome: 'Qualquer certificado', value: '1' },
    { nome: 'e-CPF', value: '2' },
    { nome: 'e-CNPJ', value: '3' }
  ]

  private coresUsadas: string[] = [];
  protected viewPreferencias = false;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef

  ) {
  }

  ngOnInit(): void {
    this.signatarios.forEach((sig, index) => {
      sig.color = this.getPrimeiraCorDisponivel();
      this.coresUsadas.push(sig.color);
    })
  }

  isSignatarioConfigurado(signatario: any) {
    return signatario.rubricas.some((rubrica: any) =>
      this.posicoes?.get(rubrica.page)?.has(rubrica.id)
    );
  }

  remover(signatario, removerDaLista: boolean, click: MouseEvent) {
    click.stopPropagation();
    this.removerSignatario.emit({
      signatario: signatario,
      removerDaLista: removerDaLista
    });
    if (this.lock) {
      signatario.lock = !signatario.lock;
    }
  }

  configurarPreferencias(signatario: PosicaoAssinatura) {
    this.signatarioSelecionado = signatario;
    if(!this.signatarioSelecionado.preferenciasSignatario)
      this.signatarioSelecionado.preferenciasSignatario = new Preferencias();
    this.viewPreferencias = true;
  }

  selecionarSignatario(signatario: PosicaoAssinatura, click?: MouseEvent): any {

    if (!signatario.color || signatario.color == '')
      signatario.color = this.getPrimeiraCorDisponivel();
    click?.stopPropagation();
    this.selecionarSignatarioEmit.emit(signatario);
    this.signatarioSelecionado = signatario;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getPrimeiraCorDisponivel(): string | null {
    for (const [cor, usada] of CORES.entries()) {
      if (!usada) {
        CORES.set(cor, true);
        return cor;
      }
    }
    return this.getRandomColor();
  }

  getNome(signatario: any) {
    if (signatario?.nome)
      return signatario?.nome;
    else if (signatario?.signatario)
      return signatario?.signatario;
    return signatario?.id;
  }

  ngOnDestroy(): void {
    this.coresUsadas.forEach(cor => {
      cores.set(cor, false);
    })
  }
}

interface Pessoa {
  id: number;
  nome: string;
  email: string;
  color: string;
}
