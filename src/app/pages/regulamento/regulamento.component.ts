import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-regulamento',
  templateUrl: './regulamento.component.html',
  styleUrls: ['./regulamento.component.css']
})
export class RegulamentoComponent implements OnInit {
  checktermo: boolean;
  esconde
  user:User

  constructor(public af: AngularFireAuth, private usersService: UsersService,private router: Router, private activatedRoute: ActivatedRoute) {
    this.checktermo = false
    this.af.user.subscribe(async auth => {
      if (this.esconde) {
        if(auth) {
          this.getUserInfo(auth.email)
         }
      }
    })
  }

  async getUserInfo(email) {
    let user_info = await this.usersService.getUserByEmail(email);
    this.user = user_info.value[0]
    if (this.user?.termos != false) {
      this.router.navigateByUrl('/meus-cupons')
    }
 }


  ngOnInit(): void {
    this.checktermo = false
    this.activatedRoute.queryParams.subscribe(params => {
      this.esconde = params.read
    });
  }

}
