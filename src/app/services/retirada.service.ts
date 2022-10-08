import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Sorteio } from '../models/sorteio';
import { Observable } from 'rxjs';
import { Retirada } from '../models/retirada';

@Injectable({
  providedIn: 'root'
})
export class RetiradaService {

  constructor(private client: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/retirada`;
  }

  readonly apiURL : string;

  getRetiradas(): Promise<Result>{
    return this.client.get<Result>(this.apiURL).toPromise();
  }

  getRetiradaByID(id: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/${id}`);
  }

  addRetirada(retirada: Retirada): Promise<Result>{
    return this.client.post<Result>(this.apiURL, retirada).toPromise();
  }

}
