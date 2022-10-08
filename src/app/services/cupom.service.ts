import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Cupom } from '../models/cupom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuponsService {

  constructor(public client: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/cupom`;
  }

  readonly apiURL : string;

  getCupons(): Observable<Result>{
    return this.client.get<Result>(this.apiURL);
  }

  getCupomByID(id: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/${id}`);
  }

  getCupomByUser(id: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/user-cupom/${id}`);
  }

  getCupomByChave(chave: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/chave-cupom/${chave}`);
  }

  addCupom(cupom: Cupom): Promise<Result>{
    return this.client.post<Result>(this.apiURL, cupom).toPromise();
  }

  addCupomQueue(cupom: Cupom): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/qrcode`, cupom).toPromise();
  }

  delCupom(id: any): Observable<Result>{
    return this.client.delete<Result>(`${this.apiURL}/${id}`);
  }
}
