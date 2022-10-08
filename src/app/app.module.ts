import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { routes } from './app.routes';
import { FooterComponent } from './footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TermoDeUsoComponent } from './pages/termo-de-uso/termo-de-uso.component';
import { RegulamentoComponent } from './pages/regulamento/regulamento.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { CadastrarCupomComponent } from './pages/cadastrar-cupom/cadastrar-cupom.component';
import { LoginComponent } from './pages/login/login.component';
import { PainelUsuarioComponent } from './pages/painel-usuario/painel-usuario.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { UsersService } from './services/users.service';
import { QrCodeService } from './services/qrcode.service';
import { CuponsService } from './services/cupom.service';
import { VoucherService } from './services/voucher.service';
import { SplitPipe } from './core/Split.pipe';
import { SorteiosComponent } from './pages/sorteios/sorteios.component';
import { SorteioService } from './services/sorteio.service';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { LojasService } from './services/lojas.service';
import { EmailService } from './services/email.service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxSpinnerModule } from "ngx-spinner";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CalendarioService } from './services/calendario.service';
import { LoteriaService } from './services/loteria.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxGaugeModule } from 'ngx-gauge';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AnalyticsService } from './services/analytics.service';
import { LoginSocialComponent } from './login-redes-sociais/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { Page404Component } from './pages/404/404.component';
import { FinalizarCadastroComponent } from './pages/finalizar-cadastro/finalizar-cadastro.component';
import { RetiradaService } from './services/retirada.service';
import { DuvidasComponent } from './pages/duvidas/duvidas.component';
import { ComoParticiparComponent } from './pages/como-participar/como-participar.component';
import { GanhadoresComponent } from './pages/ganhadores/ganhadores.component';
import { TelaMenusComponent } from './pages/tela-menus/tela-menus.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AvisoComponent } from './pages/aviso/aviso.component';
import { BlackListComponent } from './pages/black-list/black-list.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ComprovantesComponent } from './pages/comprovantes/comprovantes.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    AppComponent,
    FooterComponent,
    HomeComponent,
    TermoDeUsoComponent,
    RegulamentoComponent,
    RecuperarSenhaComponent,
    CadastrarCupomComponent,
    LoginComponent,
    PainelUsuarioComponent,
    QrScanComponent,
    SplitPipe,
    SorteiosComponent,
    ComprovantesComponent,
    ConsultaComponent,
    AnalyticsComponent,
    LoginSocialComponent,
    Page404Component,
    FinalizarCadastroComponent,
    DuvidasComponent,
    ComoParticiparComponent,
    GanhadoresComponent,
    TelaMenusComponent,
    AvisoComponent,
    BlackListComponent
  ],
  imports: [
    AutocompleteLibModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    routes,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    TextMaskModule,
    CurrencyMaskModule,
    DeviceDetectorModule.forRoot(),
    NgxSpinnerModule,
    PdfViewerModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxGaugeModule,
    HighchartsChartModule,
  ],
  providers: [AnalyticsService,RetiradaService, LojasService, AngularFireAuthGuard,UsersService,QrCodeService,CuponsService,VoucherService,SorteioService,EmailService,CalendarioService,LoteriaService,
  {provide: 'googleTagManagerId',  useValue: 'GTM-TP2PP9Q'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
