import { Component, OnInit } from "@angular/core";
import { VoucherService } from "src/app/services/voucher.service";
import { UsersService } from "src/app/services/users.service";
import Swal from "sweetalert2";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Role } from "src/app/models/role";
import { LojasService } from "src/app/services/lojas.service";
import { RetiradaService } from "src/app/services/retirada.service";
import { Retirada } from "../../models/retirada";
import * as moment from "moment";
import { User } from "src/app/models/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
})
export class ConsultaComponent implements OnInit {
  voucher;
  cpf_funcionario;
  loja;
  lojas;
  data_retirada;
  dandoBaixa: boolean = false;
  name: any;
  user_id: string;
  user_email: string;
  user: any;
  client: any;
  formBaixa: FormGroup;

  fileData1: File = null;
  fileData2: File = null;
  jsonData: string;

  readonly apiURL: string;

  uploading = false;
  fileOneLoaded = false;
  fileTwoLoaded = false;
  response: any;

  progress = 0;

  success: boolean = false;
  error: boolean = false;
  errorMsg: string;

  constructor(
    private retiradaService: RetiradaService,
    private lojasService: LojasService,
    private voucherService: VoucherService,
    private userService: UsersService,
    public af: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.af.user.subscribe(async (auth) => {
      if (auth) {
        this.name = auth;
        this.user_id = auth.uid;
        this.user_email = auth.email;
        this.getUserInfo();
        await this.obtemLojas();
        this.criarFormularioDeBaixa();
      }
    });
  }

  logout() {
    this.af.signOut();
    this.router.navigateByUrl("/login");
  }

  criarFormularioDeBaixa() {
    this.formBaixa = this.fb.group({
      cpf_funcionario: [
        "",
        Validators.compose([
          Validators.required,
        ]),
      ],
      loja: [
        "",
        Validators.compose([
          Validators.required,
        ]),
      ],
      data_retirada: [
        "",
        Validators.compose([
          Validators.required,
        ]),
      ],
      cartaCompromisso: ["", Validators.compose([Validators.required,])],
      reciboEntregaPremio: ["", Validators.compose([Validators.required,])]
    });
  }

  async getUserInfo() {
    let user_info = await this.userService.getUserByEmail(this.user_email);
    this.user = user_info;
    this.user.nome = user_info.value[0].nome.split(" ")[0];
    if (this.user?.termos == false) {
      this.router.navigate(["/regulamento"], { queryParams: { read: true } });
    }
    if (user_info.value[0].role == Role.user) {
      this.router.navigateByUrl("/meus-cupons");
    }
  }

  async consultaVoucher(codigo) {
    let voucher = await this.voucherService.getCupomByCodigoWithUser(codigo);
    if (voucher) {
      this.voucher = voucher.value[0];
      this.voucher.cupom = voucher.value[0].cupom;
      this.voucher.sorteado = true;
      let user_info = await this.userService.getUserByEmail(
        this.voucher["email"]
      );
      this.voucher.user = user_info.value[0].email;
      this.client = user_info.value[0];
    } else {
      Swal.fire(
        "Código inválido",
        "Verificamos que esse código não existe em nosso sistema.",
        "warning"
      );
    }
  }

  async obtemLojas() {
    this.lojas = await this.lojasService.getLojas();
    this.lojas = this.lojas["value"];
  }

  async atualizaVoucher() {
    this.spinner.show();
    this.voucher.retirou_premio = true;
    this.voucher.sorteado = true;
    const formData = new FormData();
    formData.append("cartaCompromisso", this.fileData1);
    formData.append("reciboEntregaPremio", this.fileData2);
    formData.append("codigo", this.voucher.codigo);
    formData.append("cupom", this.voucher.cupom);
    formData.append("user", this.voucher.user);
    formData.append("sorteado", "true");
    formData.append("retirou_premio", "true");
    formData.append("dt_cadastro", this.voucher.dt_cadastro);

    await this.voucherService.updateVoucher(formData, this.voucher.codigo);

    this.success = true;
    let retirada = new Retirada();
    retirada.cpf_funcionario = this.formBaixa.get('cpf_funcionario').value;
    retirada.dt_cadastro = moment(new Date()).format("YYYY-MM-DD");
    retirada.id_loja = this.loja;
    retirada.usuario_logado = this.user_email;
    retirada.voucher = this.voucher.codigo;
    retirada.dt_retirada = this.formBaixa.get('data_retirada').value;
    if (retirada.id_loja == undefined) {
      retirada.id_loja = 1;
    }
    this.retiradaService.addRetirada(retirada);
    this.dandoBaixa = false;
    this.spinner.hide();
    Swal.fire({
      title: "Sucesso!",
      html: "Importado com sucesso",
      icon: "success",
    });
  }

  fileChange1(event) {
    this.fileData1 = event.target.files[0];
    this.fileOneLoaded = true;
  }
  fileChange2(event) {
    this.fileData2 = event.target.files[0];
    this.fileTwoLoaded = true;
  }

  async onSubmit() { }

  MudarParadandoBaixa() {
    this.dandoBaixa = true;
  }

  mudaLoja(ev) {
    this.loja = ev;
  }
}
