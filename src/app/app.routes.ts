import { Routes } from '@angular/router';
import { PainelRouteBaseComponent } from './shared/components/painel-route-base/painel-route-base.component';
import { PublicoListaServicosComponent } from './publico/servico/publico-lista-servicos/publico-lista-servicos.component';
import { PreencherSolicitacaoServicoPublicoComponent } from './publico/servico/preencher-solicitacao-servico-publico/preencher-solicitacao-servico-publico.component';
import { RequestTrackerComponent } from './minha-conta/request-tracker/request-tracker.component';
import { RequestListComponent } from './minha-conta/request-list/request-list.component';
import { PreencherFormularioComponent } from './minha-conta/preencher-formulario/preencher-formulario.component';
import { AppLayout } from './base/sidebar/app.layout';
import { LoginSocialComponent } from './auth/login-social/login-social.component';
import { AutenticacaoComponent } from './auth/autenticacao/autenticacao.component';
import { AuthGuard } from './auth/services/auth.guard';

export const routes: Routes = [

    {
    path: '', component: AppLayout, canActivate: [AuthGuard], children: [
      { path: '', component: RequestListComponent },
      { path: 'lista', component: RequestListComponent },
      { path: 'detalhes/:protocoloId', component: RequestTrackerComponent },
      { path: 'servicos/:id', component: PublicoListaServicosComponent },
      { path: 'tarefa/:servicoId/:tarefaId', component: PreencherFormularioComponent },
       { path: 'servicos/:id', component: PublicoListaServicosComponent },
      { path: 'servicos/formulario/:servico/:formulario', component: PreencherSolicitacaoServicoPublicoComponent },
     ]
  },

  {
    path: 'embedded', component: PainelRouteBaseComponent, children: [
      { path: 'servicos/:id', component: PublicoListaServicosComponent },
      { path: 'formulario/:servico/:formulario', component: PreencherSolicitacaoServicoPublicoComponent },
      { path: 'formulario/:servico/:formulario/:protocolo', component: PreencherSolicitacaoServicoPublicoComponent }
    ]
  },
    { path: 'login', component: LoginSocialComponent },
      { path: 'auth', component: AutenticacaoComponent }


];
