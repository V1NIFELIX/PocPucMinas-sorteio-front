import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Erros } from 'src/app/models/erros.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  state: string = '';
  error: any;
  email
  password

  constructor(public af: AngularFireAuth,private router: Router) {
    this.af.user.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/meus-cupons')
      }
    })
  }


  onSubmit(formData) {
    if(formData.valid) {
      this.af.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
        this.router.navigate(['/meus-cupons']);
      }).catch(
        (err) => {
        this.error = Erros[err.message];
      })
    }
  }

  ngOnInit(): void {
  }
}
