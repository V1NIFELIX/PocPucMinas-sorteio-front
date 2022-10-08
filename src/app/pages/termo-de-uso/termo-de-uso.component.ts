import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-termo-de-uso',
  templateUrl: './termo-de-uso.component.html',
  styleUrls: ['./termo-de-uso.component.css']
})
export class TermoDeUsoComponent implements OnInit {
  checktermo:boolean;
  state: string = '';
  error: any;
  cpf
  telefone
  bairro
  user:User

  constructor(public af: AngularFireAuth,private router: Router, private usersService: UsersService) {
  this.checktermo = false
    this.af.user.subscribe(async auth => {
      if(auth) {
       this.getUserInfo(auth.email)
      }
    })
  }


  ngOnInit(): void {
  }

  async getUserInfo(email) {
    let user_info = await this.usersService.getUserByEmail(email);
    this.user = user_info.value[0]
    if (this.user?.termos != false) {
      this.router.navigateByUrl('/meus-cupons')
    }
 }


  Aceita() {
      this.user.termos = true
      console.log(this.user)
      this.usersService.updateUser(this.user)
      Swal.fire({
        title: 'Sucesso!',
        html: 'Cadastro Atualizado.',
        icon: 'success'
      })
      this.router.navigateByUrl('/meus-cupons')
  }

}
