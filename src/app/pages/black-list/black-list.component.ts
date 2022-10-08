import { AnalyticsService } from './../../services/analytics.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {
  analytics_clientes: any;
  clientes_bloqueados: any;
  keyword = 'nome';
  user_escolhido;
  mostra_botao = false;

  constructor(private spinner: NgxSpinnerService, private analyticsService: AnalyticsService,
    private usersService: UsersService) { }

  async ngOnInit(){
    this.spinner.show();
    this.analytics_clientes = await (await this.analyticsService.getMelhoresClientesByPeriod(null)).value;
    await this.atualiza();
  }


  selectEvent(item) {
    this.mostra_botao = true;
    this.user_escolhido = item.email
    console.log(item)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

  bloqueia(){
    this.spinner.show();
    this.usersService.bloqueiaUserByEmail(this.user_escolhido);
    this.atualiza()
    this.spinner.hide();
  }

  async atualiza(){
    this.spinner.show();
    this.clientes_bloqueados = await (await this.usersService.bloqueados()).value;
    this.spinner.hide();
  }

}
