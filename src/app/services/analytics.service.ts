
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(public client: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/analytics`;
  }

  readonly apiURL : string;

  getByPeriod(obj): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}`, obj).toPromise();
  }


  getProductsByPeriod(obj): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/products`, obj).toPromise();
  }

  getVendasByPeriod(obj): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/vendas`, obj).toPromise();
  }

  getMelhoresClientesByPeriod(obj): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/clientes`, obj).toPromise();
  }

  getCadastrosByPeriod(obj): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/cadastros`, obj).toPromise();
  }

  getComprasByPeriod(obj): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/compras`, obj).toPromise();
  }

  getFaixaEtariaByPeriod(obj): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/faixa-etaria`, obj).toPromise();
  }
}
