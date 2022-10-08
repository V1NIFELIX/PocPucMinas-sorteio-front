import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SorteioService} from 'src/app/services/sorteio.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { Role } from 'src/app/models/role';
import { Report } from 'src/app/models/report';
import * as _ from 'lodash';
import { ReportService } from 'src/app/services/report.service';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sorteios',
  templateUrl: './sorteios.component.html',
  styleUrls: ['./sorteios.component.css']
})
export class SorteiosComponent implements OnInit {

  name: any
  user_id: any
  user_email: any
  state: string = ''
  sorteios: any = [];
  vouchers: any = [];
  vouchers_codigos: any = [];
  sorteado_for: any;
  user: any;
  numeros_loteria: any;
  conteudo_XLL: Report[] = [];


  constructor(
    private sorteioService: SorteioService,
    public af: AngularFireAuth, private router: Router,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private reportService: ReportService) {}

  logout() {
    this.af.signOut()
    this.router.navigateByUrl('/login')
  }

  async ngOnInit() {
    this.af.user.subscribe(async auth => {
      if (auth) {
        this.name = auth
        this.user_id = auth.uid
        this.user_email = auth.email
        this.getUserInfo();
        this.getSorteios();
      }
    })
  }

  async getUserInfo() {
    let user_info = await this.userService.getUserByEmail(this.user_email)
    this.user = user_info
    this.user.nome = this.user.value[0].nome.split(" ")[0]
    if (this.user?.termos == false) {
      this.router.navigate(['/regulamento'], {
        queryParams: {
          read: true
        }
      })

    }
    if (user_info.value[0].role != Role.admin) {
      this.router.navigateByUrl('/meus-cupons')
    }
  }

  async getSorteios() {
    this.spinner.show();
    this.sorteios = await (await this.sorteioService.getSorteios())?.value;
    this.spinner.hide();
  }

  async enviaEmailSorteados(id) {
    Swal.fire({
      title: 'Você tem certeza ?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        let resultado = await (await this.sorteioService.updateSorteio(id));
        this.spinner.hide();
        if (resultado.code == "error") {
          Swal.fire(
            'Erro ao Enviar os Emails',
            'Eita deu ruim..',
            'warning'
          )
        } else {
          Swal.fire({
            title: 'Sucesso!',
            html: 'Emails Enviados com Sucesso!',
            icon: 'success'
          })
          this.getSorteios()
        }
      }
    })

  }

  async baixarRelatorio(index: any, id: any, data: any){
    let copiaJson = _.cloneDeep(this.sorteios[index]),
    retornoDocumento;

    this.conteudo_XLL = []
    await this.geradorJSONXLL(copiaJson);
    this.conteudo_XLL[0].id_sorteio = `Sorteio - ${id}`;
    this.conteudo_XLL[0].data_sorteio = moment(data).format("DD/MM/YYYY");
    retornoDocumento = await this.reportService.getReport({"data": this.conteudo_XLL},"template-ganhadores");

    if(retornoDocumento.result == 'success'){
      let documentoBlob = await this.reportService.downloadReport(retornoDocumento.data);
      saveAs.saveAs(documentoBlob, `Sorteio_${moment(data).format("DD/MM/YYYY")}.xlsx`);
    }
  }

  geradorJSONXLL(sorteio: any[]){
    let vouchers = sorteio['voucher'];

    if(vouchers.length <= 0)
      return;

    this.conteudo_XLL.push({
      nome_ganhador: vouchers[vouchers.length-1]['user'].nome,
      cpf_ganhador: vouchers[vouchers.length-1]['user'].cpf,
      telefone_ganhador: vouchers[vouchers.length-1]['user'].telefone,
      numero_da_sorte: vouchers[vouchers.length-1]['codigo'],
      associado: vouchers[vouchers.length-1]['loja'].ASSOC,
      telefone_associado: vouchers[vouchers.length-1]['loja'].TELEFONE,
      loja: vouchers[vouchers.length-1]['cupom'].razao_social,
      cpnj: vouchers[vouchers.length-1]['cupom'].cnpj,
      endereco: vouchers[vouchers.length-1]['loja'].ENDERECO,
      bairro: vouchers[vouchers.length-1]['loja'].BAIRRO,
      municipio: vouchers[vouchers.length-1]['loja'].CIDADE
    } as Report)

    sorteio['voucher'].pop()
    this.geradorJSONXLL(sorteio);
  }

  async Sorteia() {

    Swal.fire({
      title: 'Você tem certeza ?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        let resultado = await (await this.sorteioService.Sorteia(this.user_email));
        this.spinner.hide();
        if (resultado.code == "error") {
          Swal.fire(
            'Erro ao Realizar o Sorteio',
            'Eita deu ruim..',
            'warning'
          )
        } else {
          Swal.fire({
            title: 'Sucesso!',
            html: 'Sorteio Realizado com Sucesso!',
            icon: 'success'
          })
          this.getSorteios()
        }
      }
    })
  }
}
