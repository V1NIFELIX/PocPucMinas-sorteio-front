import { Component, OnInit, HostBinding } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from '@angular/fire'
import { Router } from '@angular/router'
import {moveIn} from '../router.animations'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Erros } from '../models/erros.enum';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { Role } from '../models/role';
import * as moment from 'moment';

@Component({
  selector: 'app-login-social',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginSocialComponent implements OnInit {

  error: any

  constructor(private af: AngularFireAuth, private router: Router,
    private usersService: UsersService) {
    this.af.user.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/meus-cupons')
      }
    })
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

  facebookLogin(){
    this.af.signInWithPopup(new auth.FacebookAuthProvider())
    .then(
      (success) => {
        console.log(success)
        let user = new User();
        user.email = success.user.email
        user.nome = success.user.displayName
        user.role = Role.user
        user.dt_cadastro = moment(new Date()).format("YYYY-MM-DD")
        user.cpf = "CADASTRO"+this.makeid(10)
        user.termos = false;
        this.insert(user);
        this.router.navigate(['/meus-cupons'])
      }
    )
    .catch(
      (err) => {
        console.log(err)
        this.error = Erros[err.message]
      }
    )
  }

  googleLogin(){
    this.af.signInWithPopup(new auth.GoogleAuthProvider())
    .then(
      (success) => {
        let user = new User();
        user.email = success.user.email
        user.nome = success.user.displayName
        user.role = Role.user
        user.dt_cadastro = moment(new Date()).format("YYYY-MM-DD")
        user.cpf = "CADASTRO"+this.makeid(10)
        user.termos = false;
        this.insert(user);
        this.router.navigate(['/meus-cupons'])
      }
    )
    .catch(
      (err) => {
        this.error = Erros[err.message]
      }
    )
  }

  makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  insert(user){
    this.usersService.addUser(user);
  }

}
