import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Sorteio } from '../models/sorteio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SorteioService {

  constructor(private client: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/sorteio`;
  }

  readonly apiURL : string;

  Sorteia(usuario): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/sorteia/${usuario}`).toPromise();
  }

  Ganhadores(): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/sorteados/get`).toPromise();
  }

  getSorteios(): Promise<Result>{
    return this.client.get<Result>(this.apiURL).toPromise();
  }

  updateSorteio(id): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/envia-email/${id}`).toPromise();
  }

  getSorteioByID(id: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/${id}`);
  }

  addSorteio(sorteio: Sorteio): Observable<Result>{
    return this.client.post<Result>(this.apiURL, sorteio);
  }

  delSorteio(id: any): Observable<Result>{
    return this.client.delete<Result>(`${this.apiURL}/${id}`);
  }

}
