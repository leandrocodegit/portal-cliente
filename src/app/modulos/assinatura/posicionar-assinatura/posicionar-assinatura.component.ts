import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';
import { BASE64 } from './BASE64';
import { CommonModule } from '@angular/common';
import interact from 'interactjs';
import { ManipuladorHtmlService } from './services/manipulador-html.service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ListaSignatariosComponent } from '../lista-signatarios/lista-signatarios.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModeloService } from '@/shared/services/modelo.service';
import { ProcessoService } from '@/shared/services/processo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloSignatario } from '@/shared/models/ModeloSignatario';
import { PosicaoAssinatura, Preferencias, Rubrica, TipoSignatario } from '@/shared/models/PosicaoAssinatura';
import { DialogModule } from 'primeng/dialog';
import { GrupoService } from '@/shared/services/grupo.service';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';
import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { VoltarSalvarComponent } from '@/shared/components/voltar-salvar/voltar-salvar.component';
import { LoadComponent } from '@/shared/components/load/load.component';
import { TabsModule } from 'primeng/tabs';
import { UsuarioService } from '@/shared/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '@/modulos/usuarios/models/usuario.model';
import { InputText } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

var posicoes: Map<number, Map<any, any>> = new Map();
var manipuladorHtmlService: ManipuladorHtmlService;
var messageServiceG: MessageService;
var signatario: any;
@Component({
  selector: 'app-posicionar-assinatura',
  imports: [
    CommonModule,
    PdfViewerModule,
    ListaSignatariosComponent,
    AccordionModule,
    ButtonModule,
    PopoverModule,
    DialogModule,
    TabelaComponent,
    TituloPesquisaComponent,
    VoltarSalvarComponent,
    LoadComponent,
    TabsModule,
    FormsModule,
    InputText,
    TooltipModule
  ],
  templateUrl: './posicionar-assinatura.component.html',
  styleUrl: './posicionar-assinatura.component.scss'
})
export class PosicionarAssinaturaComponent implements OnInit, OnDestroy {

  @Input() modelo?: ModeloSignatario;
  @Input() pdfBase64 = BASE64;
  @Output() voltarEmit = new EventEmitter();
  protected pdf: PDFDocumentProxy;
  protected isInit = false;
  protected viewGrupos = false;
  protected viewUsers = false;
  protected isload = true;
  protected totalPages = 0;
  protected grupoSignatarios: any[] = [];
  protected usuariosGrupo: any[] = [];
  protected usuarios: any[] = [];
  protected newUsuario: Usuario = new Usuario;
  protected colsGrupos: any = [
    { header: 'Descrição', field: 'description' },
    { header: 'Id', field: 'id' }
  ];
  protected colsUsuarios: any = [
    { header: 'Nome', field: 'firstName' },
    { header: 'Email', field: 'email' }
  ];


  constructor(
    private manipuladorHtmlServices: ManipuladorHtmlService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly grupoService: GrupoService,
    private readonly modeloService: ModeloService,
    private readonly processoService: ProcessoService,
    private readonly activeRoute: ActivatedRoute,
    private readonly usuarioService: UsuarioService,
    private route: Router
  ) {
    manipuladorHtmlService = manipuladorHtmlServices;
    messageServiceG = messageService;

    manipuladorHtmlServices.duplicar.subscribe(data => {

      const pagina: number = Number.parseInt(data.pagina);
      let posicao = posicoes.get(pagina).get(data.zone);

      for (let i = 1; i <= this.totalPages; i++) {
        if (data.pagina != i && pagina != null) {
          const id = crypto.randomUUID();
          const pageContainer = document.querySelector(
            `div.page[data-page-number="${i}"]`
          ) as any;

          if (!posicoes.has(pagina))
            posicoes.set(pagina, new Map);

          let xLeft = posicao.left;
          let yTop = posicao.top;
          let width = posicao.width;
          let height = posicao.height;

          const newDraggable = manipuladorHtmlService.addDraggleRender(pageContainer, posicao.signatario, id, i, false, posicoes, xLeft, yTop, width, height);

          if (!posicoes.has(i))
            posicoes.set(i, new Map);

          posicoes.get(i).set(id, {
            id: id,
            top: yTop,
            left: xLeft,
            width: width,
            height: height,
            pagina: i,
            drag: newDraggable,
            signatario: posicao.signatario
          });
          manipuladorHtmlService.novaPosicao(newDraggable, posicoes);
        }
      }
      if (posicao)
        messageService.add({ severity: 'info', summary: 'Copiado', detail: posicao.signatario.email });
    })
  }

  ngOnInit(): void {
    this.listarGrupos();

    const grupo = this.modelo?.posicoes.find(posicao => posicao.tipoSignatario == TipoSignatario.GRUPO);
    if (this.modelo?.grupo && this.modelo?.posicoes.find(posicao => posicao.tipoSignatario == TipoSignatario.GRUPO))
      this.buscarGrupo(this.modelo?.grupo, true);
    else this.carregarPosicoes();

  }

  ngOnDestroy(): void {
    posicoes = new Map();
    signatario = undefined;
    this.grupoSignatarios = [];
    this.usuariosGrupo = [];
    this.modelo = undefined;
  }

  protected listarGrupos() {
    this.grupoService.listaGrupos(TipoGrupo.SIGNER).subscribe(response => {
      this.grupoSignatarios = response;
    });
  }

  protected listarUsuarios() {
    this.usuarioService.listaTodosUsuarios().subscribe(response => {
      this.usuarios = response;
    });
  }

  private carregarPosicoes() {
    this.modelo.posicoes.forEach((posicao: PosicaoAssinatura) => {
      posicao.rubricas.forEach((rubrica: Rubrica) => {
        if (!posicoes.has(rubrica.page))
          posicoes.set(rubrica.page, new Map);

        posicoes.get(rubrica.page).set(rubrica.id, {
          id: rubrica.id,
          top: rubrica.position_top,
          left: rubrica.position_left,
          width: rubrica.width,
          height: rubrica.height,
          page_width: rubrica.page_width,
          page_height: rubrica.page_height,
          pagina: rubrica.page,
          signatario: posicao
        });
      })
    })
    this.isload = false;
  }

  getPosicoes() {
    return posicoes;
  }

  selecionarSignatario(event: any) {
    signatario = event;
  }

  pageRendered(event: any) {
    const pageNumber: number = event.pageNumber;
    const zone = manipuladorHtmlService.addZone(event.source.div, pageNumber);
    this.isInit = true;
    this.refazerPosicoes(zone, pageNumber);
  }

  carregarPdf(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
    var intervalo = setInterval(() => {
      for (let index = 0; index < this.totalPages; index++) {
        if (!posicoes.has(index))
          posicoes.set(index, new Map);
      }
      this.initializeInteract();
      clearInterval(intervalo);
    }, 300);
  }

  private initializeInteract() {
    let lastTapTime = 0;
    interact('.inner-dropzone').unset();
    interact('.inner-dropzone')
      .on('tap', function (event) {

        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapTime;

        if (tapLength < 300 && tapLength > 0) {
          const pagina = event.target.getAttribute('data-page-number');
          if (!signatario?.email) {
            messageServiceG.add({ severity: 'warn', summary: 'Erro', detail: 'Selecione um signatário' });
          } else if (pagina != null) {
            let id = crypto.randomUUID();
            signatario.id = id;
            if (signatario.id)
              id = signatario.id;
            const dropzoneRect = event.currentTarget.getBoundingClientRect();
            const containerRect = document.getElementById('zone-' + pagina)!.getBoundingClientRect();
            const leftPercent = ((event.clientX - dropzoneRect.left) / containerRect.width) * 100 - 12;
            const topPercent = ((event.clientY - dropzoneRect.top) / containerRect.height) * 100 - 3.7;

            console.log('Y', event.clientY - dropzoneRect.top);
            console.log('X',event.clientX - dropzoneRect.left);

            signatario.left = leftPercent;
            signatario.top = topPercent;

            if (!posicoes.has(Number.parseInt(pagina)))
              posicoes.set(Number.parseInt(pagina), new Map);

            const newDraggable = manipuladorHtmlService.addDraggle(event, signatario, id, pagina, true, posicoes);

            posicoes.get(Number.parseInt(pagina)).set(id, {
              id: id,
              pagina: pagina,
              top: topPercent,
              left: leftPercent,
              x: event.clientX - dropzoneRect.left,
              y: event.clientY - dropzoneRect.top,
              width: newDraggable.getBoundingClientRect().width,
              height: newDraggable.getBoundingClientRect().height,
              page_width: containerRect.width,
              page_height: containerRect.height,
              drag: newDraggable,
              signatario: signatario,
            });
            manipuladorHtmlService.novaPosicao(newDraggable, posicoes);
          }
        }
        lastTapTime = currentTime;
      });
  }

  refazerPosicoes(pageContainer: any, pageNumber: number) {
    if (posicoes.has(pageNumber)) {
      if (pageContainer)
        for (let i = 1; i <= posicoes.get(pageNumber).size; i++) {
          Array.from(posicoes.get(pageNumber).keys()).forEach(key => {

            let posicao = posicoes.get(pageNumber).get(key);
            if (posicao?.drag)
              posicao.drag.remove();

            const newDraggable = manipuladorHtmlService.addDraggleRender(
              pageContainer,
              posicao.signatario,
              key,
              pageNumber,
              false,
              posicoes,
              posicao.left,
              posicao.top,
              posicao.width,
              posicao.height);

            posicao.drag = newDraggable;
            manipuladorHtmlService.novaPosicao(newDraggable, posicoes);
          });
        }
    }
  }

  removerTodos(value: any) {
    if (value.signatario.email) {
      this.confirmationService.confirm({
        message: value.signatario.tipoSignatario == TipoSignatario.TASK ? `Não assinar nessa tarefa ${value.signatario.nome ? value.signatario.nome : value.signatario.signatario}?` : `Deseja realmente remover ${value.signatario.email}?`,
        header: 'Confirmar ação',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Sim, remover',
        },
        accept: () => {
          manipuladorHtmlService.removerTodos(value.signatario.email, posicoes);
          this.messageService.add({ severity: 'info', summary: 'Removido', detail: value.signatario.signatario });
          console.log('Filtrou', this.modelo.posicoes);
          if (value.removerDaLista){
            this.modelo.posicoes = this.modelo.posicoes.filter(pos => pos.email != value.signatario.email);
            console.log('Filtrou', this.modelo.posicoes);
          }

        }
      });
    }
  }

  getUser() {
    return this.modelo.posicoes.filter(tipo => tipo.tipoSignatario == TipoSignatario.USER);
  }

  getTask() {
    return this.modelo.posicoes.filter(tipo => tipo.tipoSignatario == TipoSignatario.TASK);
  }

  getGrupo() {
    return this.modelo.posicoes.filter(tipo => tipo.tipoSignatario == TipoSignatario.GRUPO);
  }

  getExtras() {
    return this.modelo.posicoes.filter(tipo => tipo.tipoSignatario == TipoSignatario.EXTRA);
  }

  removerGrupo() {
    this.confirmationService.confirm({
      message: `Remover integrantes do grupo?`,
      header: 'Confirmar ação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, remover',
      },
      accept: () => {
        signatario = undefined;
        this.modelo.grupo = undefined;
        this.getGrupo().forEach(signatario => {
          this.removerTodos({
            signatario: signatario
          });
        });
        this.modelo.posicoes = this.modelo.posicoes.filter(tipo => tipo.tipoSignatario != TipoSignatario.GRUPO);
        this.messageService.add({ severity: 'info', summary: 'Removido', detail: 'grupo removido' });
      }
    });
  }


  protected buscarGrupo(idGrupo: string, isOrdenarPosicao?: boolean) {
    this.grupoService.buscarGrupo(idGrupo).subscribe(grupo => {

      this.carregarPosicoes();
      if (isOrdenarPosicao) {
        this.modelo.posicoes.forEach(posicao => {
          const ordens = JSON.parse(grupo.attributes.signatarios[0])
          posicao.ordem = ordens.find(ordem => ordem.id == posicao.externalId)?.ordem ?? 0;
        });
        this.modelo.posicoes = this.modelo.posicoes.sort((a, b) => a.ordem - b.ordem);
      } else {
        this.grupoService.listaMembrosGrupo(idGrupo).subscribe(response => {
          response.forEach(user => {
            const ordens = JSON.parse(grupo.attributes.signatarios[0])
            user.ordem = ordens.find(ordem => ordem.id == user.id)?.ordem ?? 0;
            this.usuariosGrupo.push(user)
          })
          this.usuariosGrupo = this.usuariosGrupo.sort((a, b) => a.ordem - b.ordem);

          this.usuariosGrupo.forEach(user => {
            this.modelo.posicoes.push({
              id: '',
              externalId: user.id,
              descricao: user.username,
              nome: user.firstName,
              color: 'red',
              tipoSignatario: TipoSignatario.GRUPO,
              email: user.email,
              ordem: user.ordem,
              type: '',
              enabled: true,
              rubricas: [],
              preferenciasSignatario: new Preferencias
            })
          })

          this.viewGrupos = false;
        })
      }
    })
  }

  adicionarGrupo(grupo: any) {
    this.modelo.grupo = grupo.id;
    this.buscarGrupo(grupo.id);
  }

  salvar() {
    this.modelo.posicoes.forEach(signatario => {

      var rubricas : Rubrica []= [];
      for (let index = 1; index < posicoes.size; index++) {
        Array.from(posicoes.get(index).keys()).forEach(key => {

          let posicao = posicoes.get(index).get(key);
          if (posicao.signatario.email == signatario.email) {
            rubricas.push({
              page: posicao.pagina,
              height: posicao.height,
              width: posicao.width,
              page_height: posicao.page_height,
              page_width: posicao.page_width,
              position_x: posicao.x,
              position_y: posicao.y,
              position_left: posicao.left,
              position_top: posicao.top,
            });
          }
        });
      }
      signatario.rubricas = rubricas;
    });
    this.modeloService.salvarRubricas(this.modelo).subscribe(response => {
    });
  }

  voltar() {
    this.voltarEmit.emit();
  }

  getSignatario() {
    return signatario;
  }

  verUsuarios() {
    this.viewUsers = true;
    this.listarUsuarios();
  }

  adicionarUsuario(value?: Usuario) {
    let user = value;
    if (!value)
      user = this.newUsuario;
    if (this.isSignatarioConfigurado(user)) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Este usuário já faz parte da lista' });
    } else {
      this.createUser(user);
      this.newUsuario = new Usuario;
      this.carregarPosicoes();
    }
  }

  isSignatarioConfigurado(signatario: Usuario): boolean {
    return !!this.modelo.posicoes.find(pos => pos?.email == signatario?.email);
  }

  private createUser(user: Usuario) {
    this.modelo.posicoes.push({
      id: '',
      externalId: '',
      descricao: user.username,
      nome: user.firstName,
      tipoSignatario: TipoSignatario.EXTRA,
      email: user.email,
      ordem: 0,
      color: '',
      type: '',
      enabled: true,
      rubricas: [],
      preferenciasSignatario: new Preferencias
    })
  }
}
