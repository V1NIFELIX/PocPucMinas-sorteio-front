import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SorteioService } from 'src/app/services/sorteio.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { Role } from 'src/app/models/role';
import { Report } from 'src/app/models/report';
import * as _ from 'lodash';
import { ReportService } from 'src/app/services/report.service';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-comprovantes',
  templateUrl: './comprovantes.component.html',
  styleUrls: ['./comprovantes.component.css']
})
export class ComprovantesComponent implements OnInit {

  name: any
  user_id: any
  user_email: any
  state: string = ''
  sorteios: any = [];
  vouchersPendentes: any = [];
  vouchers_codigos: any = [];
  user: any;

  constructor(
    private voucherService: VoucherService,
    public af: AngularFireAuth, private router: Router,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private reportService: ReportService) { }

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
        this.getVoucherPendentes();
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
  async downloadComprovante(nameComprovante){
    this.spinner.show();
    let document = await this.voucherService.downloadComprovante(nameComprovante);
    saveAs.saveAs(document, `${nameComprovante}`);
    this.spinner.hide();
  }

  async patchAprovar(id) {
    this.spinner.show();
    let result = await (await this.voucherService.patchAprovar(id))?.value;
    console.log(result);
    this.spinner.hide();
    if (result.code == "error") {
      Swal.fire(
        'Erro ao aprovar',
        '=(',
        'warning'
      )
    } else {
      Swal.fire({
        title: 'Sucesso!',
        html: 'Aprovado com sucesso',
        icon: 'success'
      })
      this.getVoucherPendentes()
    }
  }

  async getVoucherPendentes() {
    this.spinner.show();
    this.vouchersPendentes = await (await this.voucherService.getVoucherPendentes())?.value;
    this.spinner.hide();
  }
}
