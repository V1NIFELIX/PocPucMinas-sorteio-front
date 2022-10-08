import {
  Component,
  OnInit
} from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  Router
} from '@angular/router';
import {
  UsersService
} from 'src/app/services/users.service';
import {
  CuponsService
} from 'src/app/services/cupom.service';
import {
  Cupom
} from 'src/app/models/cupom';
import {
  VoucherService
} from 'src/app/services/voucher.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-painel-usuario',
  templateUrl: './painel-usuario.component.html',
  styleUrls: ['./painel-usuario.component.css']
})
export class PainelUsuarioComponent implements OnInit {

  name: any
  user_id: any
  user_data: User
  state: string = ''
  cupons: any = [];
  user: User;

  constructor(
    private voucherService: VoucherService,
    private cuponsService: CuponsService,
    public af: AngularFireAuth, private router: Router,
    private userService: UsersService) {


  }

  logout() {
    this.af.signOut()
    this.router.navigateByUrl('/')
  }


  async ngOnInit() {
    await this.af.user.subscribe(async auth => {
      if (auth) {
        this.name = auth
        this.user_id = auth.uid
        await this.getUserInfo(auth.email);
      }
    })
  }

  async getUserInfo(email) {
     let user_info = await this.userService.getUserByEmail(email);
      let user_info_bloqueado = await (await this.userService.bloqueadosByEmail(email)).value;

      this.user = user_info.value[0]
      if (user_info_bloqueado.length > 0) {
        this.router.navigateByUrl('/aviso')
      }else{
          if (this.user) {
            this.user.nome = this.user.nome.split(" ")[0]
            this.getCupons();
          }
          if (this.user?.termos == false) {
            this.router.navigate(['/regulamento'],{ queryParams: { read: true } })
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


  getCupons() {
    this.cuponsService.getCupomByUser(this.user.email).subscribe(x => {
      this.cupons = x.value;
    })
  }

}
