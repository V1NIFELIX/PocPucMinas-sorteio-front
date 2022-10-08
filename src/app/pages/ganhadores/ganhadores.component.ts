import { Component, OnInit } from '@angular/core';
import { SorteioService } from 'src/app/services/sorteio.service';

@Component({
  selector: 'app-ganhadores',
  templateUrl: './ganhadores.component.html',
  styleUrls: ['./ganhadores.component.css']
})
export class GanhadoresComponent implements OnInit {

  sorteados
  constructor(private sorteioService: SorteioService) {
  }

  ngOnInit(): void {
    this.Sorteados()
  }

  async Sorteados(){
    this.sorteados = await (await (this.sorteioService.Ganhadores())).value;
  }

}
