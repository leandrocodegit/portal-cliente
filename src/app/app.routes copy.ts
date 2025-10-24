import { Routes } from '@angular/router';
import { DashboardAgendamentosComponent } from './modulos/agendamentos/components/dashboard-agendamentos/dashboard-agendamentos.component';
import { CalendarioGridComponent } from './modulos/agendamentos/components/calendario-grid/calendario-grid.component';
import { LoginSocialComponent } from './auth/login-social/login-social.component';
import { AutenticacaoComponent } from './auth/autenticacao/autenticacao.component';
import { ListaAgendaDiaComponent } from './modulos/agendamentos/components/lista-agenda-dia/lista-agenda-dia.component';
import { ConfiguracaoesAgendaComponent } from './modulos/agendamentos/components/configuracaoes-agenda/configuracaoes-agenda.component';
import { ListaHorariosAgendaComponent } from './modulos/agendamentos/components/lista-horarios-agenda/lista-horarios-agenda.component';
import { Landing } from './modulos/landing/landing';
import { CadastroComponent } from './modulos/landing/cadastro/cadastro.component';
import { Home } from './modulos/landing/components/home';
import { ListaServicosComponent } from './modulos/servicos/lista-servicos/lista-servicos.component';
import { PainelUsuarioLogadoComponent } from './modulos/minha-conta/painel-usuario-logado/painel-usuario-logado.component';
import { MeusDadosComponent } from './modulos/minha-conta/meus-dados/meus-dados.component';
import { EditarDadosComponent } from './modulos/minha-conta/editar-dados/editar-dados.component';
import { ListaProcessosComponent } from './modulos/processo/lista-processos/lista-processos.component';
import { ListaGruposComponent } from './modulos/processo/grupos/lista-grupos/lista-grupos.component';
import { FormularioGrupoComponent } from './modulos/processo/grupos/formulario-grupo/formulario-grupo.component';
import { ListaTarefasComponent } from './modulos/tarefas/lista-tarefas/lista-tarefas.component';
import { DetalhesTarefaComponent } from './modulos/tarefas/detalhes-tarefa/detalhes-tarefa.component';
import { DetalhesProcessoComponent } from './modulos/processo/detalhes-processo/detalhes-processo.component';
import { DetalhesInstanciaComponent } from './modulos/processo/detalhes-instancia/detalhes-instancia.component';
import { FormularioServicoComponent } from './modulos/servicos/formulario-servico/formulario-servico.component';
import { FormularioConfiguracaoProtocoloComponent } from './modulos/servicos/formulario-configuracao-protocolo/formulario-configuracao-protocolo.component';
import { PainelProtocolosComponent } from './modulos/servicos/painel-protocolos/painel-protocolos.component';
import { DetalhesProtocoloComponent } from './modulos/servicos/detalhes-protocolo/detalhes-protocolo.component';
import { PainelDetalhesProtocoloComponent } from './modulos/servicos/painel-detalhes-protocolo/painel-detalhes-protocolo.component';
import { PainelUsuarioComponent } from './modulos/usuarios/painel-usuario/painel-usuario.component';
import { ListaUsuariosComponent } from './modulos/usuarios/lista-usuarios/lista-usuarios.component';
import { FormUsuarioComponent } from './modulos/usuarios/form-usuario/form-usuario.component';
import { ListaPermissoesComponent } from './modulos/usuarios/lista-permissoes/lista-permissoes.component';
import { PermissoesUsuarioComponent } from './modulos/usuarios/permissoes-usuario/permissoes-usuario.component';
import { HistoricoComponent } from './modulos/usuarios/historico/historico.component';
import { AppLayout } from './base/sidebar/app.layout';
import { PainelDashboardComponent } from './base/painel-dashboard/painel-dashboard.component';
import { ListaFormulariosComponent } from './modulos/bpmn/lista-formularios/lista-formularios.component';
import { ListaModelosComponent } from './modulos/modelos/lista-modelos/lista-modelos.component';
import { FormularioModelosComponent } from './modulos/modelos/formulario-modelos/formulario-modelos.component';
import { TabsFormulariosComponent } from './modulos/bpmn/tabs-formularios/tabs-formularios.component';
import { CriarFormularioComponent } from './modulos/bpmn/criar-formulario/criar-formulario.component';
import { PainelDecisaoComponent } from './modulos/bpmn/decisoes/components/painel-decisao/painel-decisao.component';
import { CriarDecisaoComponent } from './modulos/bpmn/decisoes/components/criar-decisao/criar-decisao.component';
import { PainelFluxosComponent } from './modulos/bpmn/fluxos/painel-fluxos/painel-fluxos.component';
import { CriarFluxoBpmnComponent } from './modulos/bpmn/fluxos/criar-fluxo-bpmn/criar-fluxo-bpmn.component';
import { CriarFormularioCustomizadoComponent } from './modulos/bpmn/formularios/criar-formulario-customizado/criar-formulario-customizado.component';
import { ListaDeployesComponent } from './modulos/bpmn/deploy/lista-deployes/lista-deployes.component';
import { FormularioDeployComponent } from './modulos/bpmn/deploy/formulario-deploy/formulario-deploy.component';
import { DetalhesDeployComponent } from './modulos/bpmn/deploy/detalhes-deploy/detalhes-deploy.component';
import { ListaFiltrosComponent } from './modulos/filtros/lista-filtros/lista-filtros.component';
import { FormularioFiltrosComponent } from './modulos/filtros/formulario-filtros/formulario-filtros.component';
import { InstanciasProtocoloComponent } from './modulos/servicos/instancias-protocolo/instancias-protocolo.component';
import { ListaProtocolosComponent } from './modulos/servicos/lista-protocolos/lista-protocolos.component';
import { FormularioPermisoesComponent } from './modulos/usuarios/formulario-permisoes/formulario-permisoes.component';
import { AuthGuard } from './auth/services/auth.guard';
import { ListaLixeiraComponent } from './modulos/lixeira/lista-lixeira/lista-lixeira.component';
import { PainelRouteBaseComponent } from './shared/components/painel-route-base/painel-route-base.component';
import { AssinarDocumentoComponent } from './modulos/assinatura/assinar-documento/assinar-documento.component';
import { PublicoListaServicosComponent } from './publico/servico/publico-lista-servicos/publico-lista-servicos.component';
import { CriarSignersComponent } from './modulos/assinatura/criar-signers/criar-signers.component';
import { FormularioGrupoSignatarioComponent } from './modulos/usuarios/formulario-grupo-signatario/formulario-grupo-signatario.component';
import { ListaGruposSignatariosComponent } from './modulos/usuarios/lista-grupos-signatarios/lista-grupos-signatarios.component';
import { TabsUsuarioComponent } from './modulos/usuarios/tabs-usuario/tabs-usuario.component';

export const routes: RoutesS = [

  { path: 'sign', component: CriarSignersComponent },
  { path: 'publico', component: PublicoListaServicosComponent },
  {
    path: 'painel', component: AppLayout, canActivate: [AuthGuard], children: [
      {
        path: 'processo', component: PainelRouteBaseComponent, children: [
          { path: ':idProcess/detalhes/:instanceId', redirectTo: ':idProcess/detalhes/:instanceId/0', pathMatch: 'full' },
          { path: ':idProcess/detalhes/:instanceId/:tab', component: DetalhesInstanciaComponent },
        ]
      },
      {
        path: 'tarefa', component: PainelRouteBaseComponent, children: [
          { path: '', component: ListaTarefasComponent },
          { path: 'form', component: FormularioGrupoComponent },
          { path: 'detalhes/:id', component: DetalhesTarefaComponent },
          { path: 'detalhes/:id/:tab', component: DetalhesTarefaComponent },
        ]
      },
      {
        path: 'grupo', component: PainelRouteBaseComponent, children: [
          { path: '', component: ListaGruposComponent },
          { path: 'form', component: FormularioGrupoComponent },
          { path: 'edit/:id', component: FormularioGrupoComponent },
        ]
      },
      {
        path: 'modelo', component: PainelRouteBaseComponent, children: [
          { path: '', component: ListaModelosComponent },
          { path: 'form', component: FormularioModelosComponent },
          { path: 'edit/:id', component: FormularioModelosComponent },
        ]
      },
      {
        path: 'filtro', component: PainelRouteBaseComponent, children: [
          { path: '', component: ListaFiltrosComponent },
          { path: 'form', component: FormularioFiltrosComponent },
          { path: 'edit/:id', component: FormularioFiltrosComponent },
        ]
      },
      {
        path: 'lixeira', component: PainelRouteBaseComponent, children: [
          { path: '', component: ListaLixeiraComponent },
        ]
      },
      {
        path: 'protocolo', component: PainelProtocolosComponent, children: [
          { path: '', component: ListaProtocolosComponent },
          { path: ':protocolo', component: InstanciasProtocoloComponent },
        ]
      },
      {
        path: 'protocolo/:protocolo/detalhes', component: PainelDetalhesProtocoloComponent, children: [
          { path: ':instanceId', component: DetalhesProtocoloComponent },
          { path: ':instanceId/:tab', component: DetalhesProtocoloComponent }
        ]
      },

      {
        path: 'servico', component: PainelRouteBaseComponent, children: [
          { path: '', redirectTo: '0', pathMatch: 'full' },
          { path: ':tab', component: ListaServicosComponent },
          { path: ':tab/form', component: FormularioServicoComponent },
          { path: ':tab/config', component: FormularioConfiguracaoProtocoloComponent },
          { path: ':tab/config/:id', component: FormularioConfiguracaoProtocoloComponent },
          { path: ':tab/edit/:id', component: FormularioServicoComponent },

        ]
      },
      { path: 'fluxo', redirectTo: 'fluxo/form', pathMatch: 'full' },
      { path: 'fluxo/:tipo/new', component: CriarFormularioComponent },
      {
        path: 'fluxo/:tipo', component: TabsFormulariosComponent, children: [

          { path: 'deploy', redirectTo: 'deploy/implantacoes', pathMatch: 'full' },
          {
            path: '', component: PainelRouteBaseComponent, children: [
              { path: '', component: ListaFormulariosComponent },
              { path: 'edit/:id', component: CriarFormularioComponent },
              { path: ':tipo/new', component: CriarFormularioComponent },

            ]
          },
          {
            path: 'implantacoes', component: PainelRouteBaseComponent, children: [
              { path: '', component: ListaDeployesComponent },
              { path: 'new/form', component: FormularioDeployComponent },
              { path: 'edit/:id', component: FormularioDeployComponent },
              { path: 'view/:key', component: ListaProcessosComponent },
              { path: 'view/:key/detalhes/:id', component: DetalhesDeployComponent },
            ]
          },
          {
            path: 'config', component: PainelRouteBaseComponent, children: [
              { path: 'form/:id', component: CriarFormularioCustomizadoComponent },
              { path: 'bpmn/:id', component: CriarFluxoBpmnComponent },
              { path: 'dmn/:id', component: CriarDecisaoComponent },
              { path: 'processo/:idProcess/detalhes/:instanceId', component: DetalhesInstanciaComponent },
            ]
          },
        ]
      },
      /*  {
         path: 'fluxo', component: PainelFormularioComponent, children: [
           { path: '', redirectTo: 'form', pathMatch: 'full' },
           {
             path: 'deploy/new/form', component: FormularioDeployComponent
           },
           { path: 'deploy/edit/:id', component: FormularioDeployComponent },
           { path: 'deploy/view/:key/detalhes/:id', component: DetalhesDeployComponent },
           {
             path: 'deploy/new/form', component: FormularioDeployComponent
           },
           {
             path: 'deploy/view/:key', component: ListaProcessosComponent
           },
           {
             path: 'deploy/new/form', component: FormularioDeployComponent
           },
           {
             path: ':tipo/new', component: CriarFormularioComponent
           },
           {
             path: ':tipo/edit/:id', component: CriarFormularioComponent
           },
           {
             path: 'form/config', component: PainelFormularioComponent, children: [
               { path: ':id', component: CriarFormularioCustomizadoComponent }
             ]
           },
           {
             path: 'bpmn/config', component: PainelFluxosComponent, children: [
               { path: ':id', component: CriarFluxoBpmnComponent }
             ]
           },
           {
             path: 'dmn/config', component: PainelDecisaoComponent, children: [
               { path: ':id', component: CriarDecisaoComponent }
             ]
           },
           {
             path: 'form/deploy', component: PainelDeployComponent, children: [
               { path: ':id', component: CriarFormularioCustomizadoComponent }
             ]
           },
           { path: ':tipo', component: TabsFormulariosComponent },
         ]
       },
  */
      {
        path: 'agendamentos', component: PainelRouteBaseComponent, children: [
          { path: 'calendario', component: CalendarioGridComponent },
          { path: 'agenda/:dia', component: ListaAgendaDiaComponent },
          { path: 'configuracoes', component: ConfiguracaoesAgendaComponent },
          { path: 'horarios', component: ListaHorariosAgendaComponent },
          { path: '**', component: DashboardAgendamentosComponent }
        ]
      },
      {
        path: 'users', component: TabsUsuarioComponent, children: [
          { path: '', redirectTo: 'contas', pathMatch: 'full' },
              {
                path: 'signatarios', component: PainelRouteBaseComponent, children: [
                  { path: '', component: ListaGruposSignatariosComponent },
                  { path: 'form', component: FormularioGrupoSignatarioComponent },
                ]
              },
              {
                path: 'contas', component: PainelRouteBaseComponent, children: [
                  { path: '', component: ListaUsuariosComponent },
                  { path: 'form', component: FormularioGrupoSignatarioComponent },
                ]
              },
              {
                path: 'grupos', component: PainelRouteBaseComponent, children: [
                  { path: '', component: ListaPermissoesComponent },
                  { path: 'form', component: FormularioPermisoesComponent },
                ]
              },

              { path: 'grupos/permissoes/form', component: FormularioPermisoesComponent },
              { path: 'signatarios/signers/form', component: FormularioPermisoesComponent },
              { path: 'grupos/edit/:id', component: FormularioPermisoesComponent },
              { path: 'contas/form', component: FormUsuarioComponent },
              { path: 'edit/:id', component: FormUsuarioComponent },
              { path: 'restricoes', component: ListaPermissoesComponent },
              { path: 'restricoes/form', component: PermissoesUsuarioComponent },
        ]
      },
      {
        path: 'conta', component: PainelUsuarioLogadoComponent, children: [
          { path: 'meus-dados', component: MeusDadosComponent },
          { path: 'historico', component: HistoricoComponent },
          { path: 'meus-dados/editar', component: EditarDadosComponent },
          { path: 'meus-dados/historico', component: HistoricoComponent }
        ]
      },
      { path: '**', component: PainelDashboardComponent }
    ],

  },

  { path: 'login', component: LoginSocialComponent },
  { path: 'auth', component: AutenticacaoComponent },

  {
    path: '', component: Landing, children: [
      { path: '', component: Home },
      { path: 'cadastro', component: CadastroComponent },
    ]
  }
];
