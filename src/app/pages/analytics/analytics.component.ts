import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import * as _ from "lodash";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {


  gaugeType = "full";
  gaugeLabelUser = "Usuários";
  gaugeValueUser;
  gaugeLabelVoucher = "Números da Sorte";
  gaugeValueVoucher;
  gaugeLabelNotas = "Notas";
  gaugeValueNotas;
  gaugeLabelSorteios = "Sorteios";
  gaugeValueSorteios;
  gaugeLabelReaisEmCompras = "EM COMPRAS";
  gaugeValueReaisEmCompras;
  gaugeValueRetiradas;
  analytics_product;

  user: any;
  name: any
  user_id: any
  user_email: any
  valorporLoja = [];
  analytics_vendas
  analytics_clientes
  analytics_cadastros
  analytics_compras
  formUser: FormGroup;
  CARREGOU_CHART = false;




  highcharts = Highcharts;
  chartOptions_cadastros_dia = {}
  chartOptions_compras_dia = {}
  chartOptions_FAIXA_etaria = {}
  analytics_faixa_etaria: any;


  constructor(
    private analyticsService: AnalyticsService,
    private userService: UsersService,
    public af: AngularFireAuth,
    private router: Router,
    private spinner: NgxSpinnerService,
    private reportService: ReportService) { }

  ngOnInit(): void {
    this.af.user.subscribe(async auth => {
      if (auth) {
        this.name = auth
        this.user_id = auth.uid
        this.user_email = auth.email;
        this.getUserInfo();
      }
    })
    this.createForm();
    this.gerarResultadosAnalytics()
  }

  async getUserInfo() {
    let user_info = await this.userService.getUserByEmail(this.user_email);
      this.user = user_info
      if (this.user?.termos == false) {
        this.router.navigate(['/regulamento'],{ queryParams: { read: true } })
      }
      if (user_info.value[0].role == Role.user) {
        this.router.navigateByUrl('/meus-cupons')
      }
  }

  atualizaChartAnalytics_cadastros(datas,valores){
   this.chartOptions_cadastros_dia =  {
      chart: {
         type: 'column'
      },
      title: {
         text: ''
      },
      xAxis:{
         categories: datas,
         crosshair: true
      },
      yAxis : {
         min: 0,
         title: {
            text: 'Quantidade'
         }
      },
      tooltip : {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y}</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: [
      {
         name: 'Cadastros',
         data: valores
      }
    ]
   };

  }



  atualizaChartAnalytics_compras(datas,valores){

    this.chartOptions_compras_dia =  {
     chart: {
        type: 'column'
     },
     title: {
        text: ''
     },
     xAxis:{
        categories: datas,
        crosshair: true
     },
     yAxis : {
        min: 0,
        title: {
           text: 'Valor'
        }
     },
     tooltip : {
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
           '<td style = "padding:0"><b>{point.y}</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
     },
     plotOptions : {
        column: {
           pointPadding: 0.2,
           borderWidth: 0
        }
     },
     series: [
     {
        name: 'Total em Vendas',
        data: valores
     }
   ]
  };
}


atualizaChartFaixaEtaria(valores){

  this.chartOptions_FAIXA_etaria =  {
   chart: {
      type: 'pie'
   },
   title: {
      text: ''
   },
   yAxis : {
      min: 0,
      title: {
         text: 'Valor'
      }
   },
   tooltip : {
      headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   },
   plotOptions : {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        connectorColor: 'silver'
      }
    }
   },
   series: [
   {
      name: '',
      data: valores
   }
 ]
};

}

  validarFormularioDeBusca(formulario){
      this.gerarResultadosAnalytics(formulario.value);
  }

  async gerarResultadosAnalytics(formulario?: any) {
    this.spinner.show();
    let analytics = await this.analyticsService.getByPeriod(formulario);
    this.analytics_product = await (await this.analyticsService.getProductsByPeriod(formulario)).value;
    this.analytics_vendas = await (await this.analyticsService.getVendasByPeriod(formulario)).value;
    this.analytics_clientes= await (await this.analyticsService.getMelhoresClientesByPeriod(formulario)).value;
    this.analytics_cadastros = await (await this.analyticsService.getCadastrosByPeriod(formulario)).value;
    this.analytics_compras = await (await this.analyticsService.getComprasByPeriod(formulario)).value;
    this.analytics_faixa_etaria = await (await this.analyticsService.getFaixaEtariaByPeriod(formulario)).value;


// chart analytics_cadastros
    let datas_cadastro = []
    let qnde_cadastro = []
    if (this.analytics_cadastros != undefined || this.analytics_cadastros != null) {
      this.analytics_cadastros.forEach(obj => {
        datas_cadastro.push(this.FormatDATE(obj.dt_cadastro))
        qnde_cadastro.push(obj.num_cadastros)
      });
    }
    this.atualizaChartAnalytics_cadastros(datas_cadastro,qnde_cadastro)
// chart

// chart analytics_compras
    let datas_cadastro_2 = []
    let qnde_cadastro_2 = []
    if (this.analytics_compras != undefined || this.analytics_compras != null) {
      this.analytics_compras.forEach(obj => {
        datas_cadastro_2.push(this.FormatDATE(obj.dt_cadastro))
        qnde_cadastro_2.push(obj.valor_total)
      });
    }
    this.atualizaChartAnalytics_compras(datas_cadastro_2,qnde_cadastro_2)
// chart


// chart analytics_faixa_etaria
let qnde_cadastro_3  = []
if (this.analytics_faixa_etaria != undefined || this.analytics_faixa_etaria != null) {
  this.analytics_faixa_etaria.forEach(obj => {
    qnde_cadastro_3.push({ name: 'Entre 20 - 29 anos', y: obj["Entre 20 - 29"]})
    qnde_cadastro_3.push({ name: 'Entre 30 - 39 anos', y: obj["Entre 30 - 39"]})
    qnde_cadastro_3.push({ name: 'Entre 40 - 49 anos', y: obj["Entre 40 - 49"]})
    qnde_cadastro_3.push({ name: 'Entre 50 - 59 anos', y: obj["Entre 50 - 59"]})
    qnde_cadastro_3.push({ name: 'Entre 60 - 69 anos', y: obj["Entre 60 - 69"]})
    qnde_cadastro_3.push({ name: 'Entre 70 - 79 anos', y: obj["Entre 70 - 79"]})
    qnde_cadastro_3.push({ name: 'Mais de 80 anos', y: obj["Mais de 80"]})
    qnde_cadastro_3.push({ name: 'Menor que 20 anos', y: obj["Menor que 20"]})
    qnde_cadastro_3.push({ name: 'Não preenchido', y: obj["Não preenchido"]})
  });
}
this.atualizaChartFaixaEtaria(qnde_cadastro_3)
this.CARREGOU_CHART = true;
// chart



    this.gaugeValueVoucher = analytics['value'][0].voucher;
    this.gaugeValueUser = analytics['value'][0].user;
    this.gaugeValueNotas = analytics['value'][0].cupom;
    this.gaugeValueSorteios = analytics['value'][0].sorteio;
    this.gaugeValueReaisEmCompras = analytics['value'][0].valor_total;
    this.gaugeValueRetiradas = analytics['value'][0].retirada;
    this.spinner.hide();

  }
  createForm() {
    this.formUser = new FormGroup({
      dataInicio: new FormControl('', [Validators.required]),
      dataFim: new FormControl('', [Validators.required]),
    })
  }

  FormatDATE(date){
    return moment(date).format('YYYY-MM-DD');
  }

  async baixarRelatorioRANKING_DE_LOJAS(){
    this.spinner.show();
    let retornoDocumento:any = await this.reportService.getReport({"data": this.analytics_vendas},"template-ranking-lojas");

    if(retornoDocumento.result == 'success'){
      let documentoBlob = await this.reportService.downloadReport(retornoDocumento.data);
      saveAs.saveAs(documentoBlob, `RANKING_DE_LOJAS.xlsx`);
    }
    this.spinner.hide();
  }


  async baixarRelatorioRANKING_DE_Clientes(){
    this.spinner.show();
    let retornoDocumento:any = await this.reportService.getReport({"data": this.analytics_clientes},"template-ranking-clientes");

    if(retornoDocumento.result == 'success'){
      let documentoBlob = await this.reportService.downloadReport(retornoDocumento.data);
      saveAs.saveAs(documentoBlob, `RANKING_DE_CLIENTES.xlsx`);
    }
    this.spinner.hide();
  }


  async baixarRelatorioRANKING_DE_Produtos(){
    this.spinner.show();
    let retornoDocumento:any = await this.reportService.getReport({"data": this.analytics_product},"template-ranking-produtos");

    if(retornoDocumento.result == 'success'){
      let documentoBlob = await this.reportService.downloadReport(retornoDocumento.data);
      saveAs.saveAs(documentoBlob, `RANKING_DE_PRODUTOS.xlsx`);
    }
    this.spinner.hide();
  }


  async baixarRelatorioVendasDia(){
    this.spinner.show();
    this.analytics_compras.forEach(obj => {
      obj.dt_cadastro = this.FormatDATE(obj.dt_cadastro)
    });
    let retornoDocumento:any = await this.reportService.getReport({"data": this.analytics_compras},"template-vendas-dia");

    if(retornoDocumento.result == 'success'){
      let documentoBlob = await this.reportService.downloadReport(retornoDocumento.data);
      saveAs.saveAs(documentoBlob, `VENDAS_POR_DIA.xlsx`);
    }
    this.spinner.hide();
  }

  async baixarRelatorioCadastroDia(){
    this.spinner.show();
    this.analytics_cadastros.forEach(obj => {
      obj.dt_cadastro = this.FormatDATE(obj.dt_cadastro)
    });
    let retornoDocumento:any = await this.reportService.getReport({"data": this.analytics_cadastros},"template-cadastros-dia");

    if(retornoDocumento.result == 'success'){
      let documentoBlob = await this.reportService.downloadReport(retornoDocumento.data);
      saveAs.saveAs(documentoBlob, `CADASTROS_POR_DIA.xlsx`);
    }
    this.spinner.hide();
  }


  async baixarRelatorioFaixaEtaria(){
    this.spinner.show();
    this.analytics_faixa_etaria.forEach(obj => {
      obj.dt_cadastro = this.FormatDATE(obj.dt_cadastro)
    });
    var obj = this.convertFaixaEtaria(this.analytics_faixa_etaria)

    let retornoDocumento:any = await this.reportService.getReport({"data": obj},"template-faixa-etaria");
    if(retornoDocumento.result == 'success'){
      let documentoBlob = await this.reportService.downloadReport(retornoDocumento.data);
      saveAs.saveAs(documentoBlob, `FAIXA-ETARIA-CLIENTES.xlsx`);
    }
    this.spinner.hide();
  }

  convertFaixaEtaria(data){
    return data.map( obj => {
      return  {
        vinte : obj["Entre 20 - 29"],
        trinta : obj["Entre 30 - 39"],
        quarenta : obj["Entre 40 - 49"],
        cinquenta : obj["Entre 50 - 59"],
        sessenta : obj["Entre 60 - 69"],
        setenta : obj["Entre 70 - 79"],
        oitenta : obj["Mais de 80"],
        meno20 : obj["Menor que 20"],
        vazio : obj["Não preenchido (NULL)"]
      }
    })
  }

}













