import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Erros } from 'src/app/models/erros.enum';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  state: string = '';
  msg: any;
  email
  authState: any = null;
  constructor(public af: AngularFireAuth,private router: Router) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  ngOnInit(): void {
  }

  resetPassword(email: string) {
    return this.af.sendPasswordResetEmail(email)
      .then(() =>  Swal.fire(
        'Sucesso!',
        'Verifique seua caixa de Email!',
        'success'
      ))
      .catch(
        (err) => {
          this.msg = Erros[err.message];
        })
  }
}
