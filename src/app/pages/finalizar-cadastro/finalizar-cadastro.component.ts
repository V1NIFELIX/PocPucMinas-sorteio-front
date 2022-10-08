import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Erros } from 'src/app/models/erros.enum';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-finalizar-cadastro',
  templateUrl: './finalizar-cadastro.component.html',
  styleUrls: ['./finalizar-cadastro.component.css']
})
export class FinalizarCadastroComponent implements OnInit {

  state: string = '';
  error: any;
  cpf
  telefone
  bairro
  user:User

  constructor(public af: AngularFireAuth,private router: Router, private usersService: UsersService) {
    this.af.user.subscribe(async auth => {
      if(auth) {
       this.getUserInfo(auth.email)
      }
    })
  }


  async getUserInfo(email) {
    let user_info = await this.usersService.getUserByEmail(email);
    this.user = user_info.value[0]
    if (this.user?.telefone != 'undefined') {
      this.router.navigateByUrl('/meus-cupons')
    }
 }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value)
      this.user.cpf = formData.value.cpf
      this.user.telefone = formData.value.telefone
      this.user.bairro = formData.value.bairro
      this.usersService.updateUser(this.user)
      Swal.fire({
        title: 'Sucesso!',
        html: 'Cadastro Atualizado.',
        icon: 'success'
      })
      this.router.navigateByUrl('/meus-cupons')
    }
  }

  logout() {
    this.af.signOut()
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }


}
