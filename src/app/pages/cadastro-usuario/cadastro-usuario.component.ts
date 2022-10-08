import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Role } from '../../models/role';
import { Erros } from 'src/app/models/erros.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  activeSlide = 0
  public state: string = ''
  public error: any
  formUser: FormGroup;
  user: User = new User();


  constructor(
    private af: AngularFireAuth,
    private router: Router,
    private usersService: UsersService) {
     }

    ngOnInit(): void {
      this.createForm(new User());
      window.scrollTo(0, 0)
    }

    onSubmit(formData) {
      formData.value.role = Role.user;
        this.af.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
          .then(
            (success) => {
              formData.value.termos = false;
              this.insert(formData.value);
              this.router.navigate(['/regulamento'],{ queryParams: { read: true } })

            }).catch(
              (err) => {
                this.error = Erros[err.message];
              })
    }

    insert(user){
      this.usersService.addUser(user);
    }


    createForm(user: User) {
      this.formUser = new FormGroup({
        nome: new FormControl(user.nome),
        cpf: new FormControl(user.cpf),
        bairro: new FormControl(user.bairro),
        telefone: new FormControl(user.telefone),
        email: new FormControl(user.email),
        password: new FormControl(user.password),
        dt_cadastro: new FormControl(moment(new Date()).format("YYYY-MM-DD"))
      })
    }
}
