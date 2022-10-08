import { Component, OnInit } from '@angular/core';
import { QrCodeService } from 'src/app/services/qrcode.service';
import { Cupom } from 'src/app/models/cupom';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { CuponsService } from 'src/app/services/cupom.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { VoucherService } from 'src/app/services/voucher.service';
import { LojasService } from 'src/app/services/lojas.service';
import { EmailService } from 'src/app/services/email.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from "ngx-spinner";
import { CalendarioService } from 'src/app/services/calendario.service';
import * as moment from 'moment';
import * as Cnpj from "@fnando/cnpj";
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cadastrar-cupom',
  templateUrl: './cadastrar-cupom.component.html',
  styleUrls: ['./cadastrar-cupom.component.css']
})
export class CadastrarCupomComponent implements OnInit {

  public qrcode: string;
  stage = 1;
  formCupom: FormGroup;
  user_id: any;
  user_email: any;
  isDesktop: any;
  user: User;


  constructor(
    private calendarioService: CalendarioService,
    private spinner: NgxSpinnerService,
    private deviceService: DeviceDetectorService,
    private emailService: EmailService,
    private lojasService: LojasService,
    private voucherService: VoucherService,
    private cuponsService: CuponsService,
    private router: Router,
    public af: AngularFireAuth,
    private qrCodeService: QrCodeService,
    private userService: UsersService) {

    this.isDesktop = this.deviceService.isDesktop();

  }

  async ngOnInit() {
    this.createForm(new Cupom());
    this.af.user.subscribe(async auth => {
      if (auth) {
        this.user_id = auth.uid
        this.user_email = auth.email
        await this.getUserInfo(this.user_email);
      }
    })
  }


  async getUserInfo(email) {
    let user_info = await this.userService.getUserByEmail(email);
    let user_info_bloqueado = await (await this.userService.bloqueadosByEmail(email)).value;

    this.user = user_info.value[0]
    if (user_info_bloqueado.length > 0) {
      this.router.navigateByUrl('/aviso')
    } else {
      if (this.user?.termos == false) {
        this.router.navigate(['/regulamento'], { queryParams: { read: true } })
      }
      if (this.user?.telefone == 'undefined') {
        this.router.navigateByUrl('/finalizar-cadastro')
      }
      if (this.user?.role == Role.admin) {
        this.router.navigateByUrl('/menu')
      }
      if (this.user?.role == Role.moderator) {
        this.router.navigateByUrl('/menu')
      }
    }

  }

  openTakePhoto() {
    this.stage = 2;
  }

  reciveQrCode(qrcode) {
    var link = qrcode.split("|");
    this.qrcode = link[0].replace('https://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=', '');
    this.formCupom.controls['chave_nota_fiscal'].setValue(this.qrcode)
  }

  async onSubmit(formData) {
    try {
      this.spinner.show();
      formData.value.chave_nota_fiscal = formData.value.chave_nota_fiscal.replace(/\s/g, '');
      formData.value.chave_nota_fiscal = formData.value.chave_nota_fiscal.replace(/[^0-9]/g,'');
      if (formData.value.chave_nota_fiscal.length !=  44) {
        this.spinner.hide();
        Swal.fire(
          'Erro de Leitura da Nota Fiscal',
          'Chave de acesso inválida. Ela deve conter 44 dígitos.',
          'warning'
        );
      } else {
        let verifica_existe_cupom = await new Promise(async (resolve, reject) => {
          await this.cuponsService.getCupomByChave(this.formCupom.value.chave_nota_fiscal).subscribe(existente => resolve(existente.value.length > 0))
        });
        if (verifica_existe_cupom) {
          this.spinner.hide();
          Swal.fire(
            'Nota já cadastrada',
            'Verificamos que essa compra já foi cadastrada, continue comprando e validando seus cupons no período de promoção para aumentar suas chances de ganhar.',
            'warning'
          );
        } else {
          let cupom = new Cupom();
          cupom.chave = formData.value.chave_nota_fiscal.trim();
          cupom.user = this.user?.email;
          cupom.cpf = this.user?.cpf;

          await this.cuponsService.addCupomQueue(cupom);
          this.spinner.hide();

          Swal.fire({
            imageUrl: '../../../assets/cadastro_queue.png',
            imageWidth: 400,
            imageHeight: 200,
            background: 'transparent',
          })
          this.router.navigate(['/meus-cupons'])
        }
      }

    } catch (error) {
      this.spinner.hide();
      Swal.fire(
        'Erro de Leitura da Nota Fiscal',
        'Realize uma Nova Tentativa em 24horas ou envie um e-mail para o suporte: promocao@redemultimarket.com.br',
        'warning'
      )
    }
  }

  createForm(cupom: Cupom) {
    this.formCupom = new FormGroup({
      razao_social: new FormControl(cupom.razao_social),
      dados_empresa: new FormControl(cupom.dados_empresa),
      total_itens: new FormControl(cupom.total_itens),
      cnpj: new FormControl(cupom.cnpj),
      valor_total: new FormControl(cupom.valor_total),
      chave_nota_fiscal: new FormControl(cupom.chave_nota_fiscal),
      quantidade_cupons: new FormControl(cupom.quantidade_cupons),
      user: new FormControl(cupom.user),
      data_emissao: new FormControl(cupom.data_emissao),
      produtos: new FormControl(cupom.produtos),
      dt_cadastro: new FormControl(moment(new Date()).format("YYYY-MM-DD")),
    })
  }

  Mudachave_nota_fiscal(ev) {
    ev = ev.replace(/\s/g, '');
    this.qrcode = ev;
  }
}
