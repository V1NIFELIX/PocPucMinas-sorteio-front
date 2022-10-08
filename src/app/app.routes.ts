import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { TermoDeUsoComponent } from './pages/termo-de-uso/termo-de-uso.component';
import { RegulamentoComponent } from './pages/regulamento/regulamento.component';
import { CadastrarCupomComponent } from './pages/cadastrar-cupom/cadastrar-cupom.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { PainelUsuarioComponent } from './pages/painel-usuario/painel-usuario.component';
import { SorteiosComponent } from './pages/sorteios/sorteios.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { Page404Component } from './pages/404/404.component';
import { FinalizarCadastroComponent } from './pages/finalizar-cadastro/finalizar-cadastro.component';
import { DuvidasComponent } from './pages/duvidas/duvidas.component';
import { ComoParticiparComponent } from './pages/como-participar/como-participar.component';
import { GanhadoresComponent } from './pages/ganhadores/ganhadores.component';
import { TelaMenusComponent } from './pages/tela-menus/tela-menus.component';
import { AvisoComponent } from './pages/aviso/aviso.component';
import { BlackListComponent } from './pages/black-list/black-list.component';
import { ComprovantesComponent } from './pages/comprovantes/comprovantes.component';

export const router: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cadastro', component: CadastroUsuarioComponent },
    { path: 'termo', component: TermoDeUsoComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'regulamento', component: RegulamentoComponent },
    { path: 'duvidas', component: DuvidasComponent },
    { path: 'como-participar', component: ComoParticiparComponent },
    { path: 'ganhadores', component: GanhadoresComponent },
    { path: 'menu', component: TelaMenusComponent },
    { path: 'cadastrar-cupom', component: CadastrarCupomComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'finalizar-cadastro', component: FinalizarCadastroComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'recuperar', component: RecuperarSenhaComponent },
    { path: 'consulta', component: ConsultaComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'meus-cupons', component: PainelUsuarioComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'sorteios', component: SorteiosComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'analytics', component: AnalyticsComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'aviso', component: AvisoComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'black-list', component: BlackListComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'page-not-found', component: Page404Component },
    { path: 'comprovantes', component: ComprovantesComponent, canActivate: [AngularFireAuthGuard]},
    { path: '**', redirectTo: '/page-not-found'},

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router,{ useHash: true });
