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
import { SorteioService } from 'src/app/services/sorteio.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-tela-menus',
  templateUrl: './tela-menus.component.html',
  styleUrls: ['./tela-menus.component.css']
})
export class TelaMenusComponent implements OnInit {

  name: any
  user_id: any
  user: any
  user_email: any



  constructor(
    public af: AngularFireAuth, private router: Router,
    private userService: UsersService) { }

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
      }
    })
  }

  async getUserInfo() {
  let user_info = await this.userService.getUserByEmail(this.user_email)
      this.user = user_info
      this.user.nome = this.user.value[0].nome.split(" ")[0]
      if (this.user?.termos == false) {
        this.router.navigate(['/regulamento'],{ queryParams: { read: true } })
      }
      if (user_info.value[0].role == Role.user) {
        this.router.navigateByUrl('/meus-cupons')
      }
      if (user_info.value[0].role == Role.moderator) {
        this.router.navigateByUrl('/consulta')
      }
  }


}
