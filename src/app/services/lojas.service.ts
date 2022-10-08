
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Loja } from '../models/loja';
import { Result } from '../models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LojasService {

    constructor(public client: HttpClient) {
        this.apiURL = `${environment.url_sorteio_api}/loja`;
    }

    readonly apiURL : string;

    getLojas(): Promise<Result>{
      return this.client.get<Result>(this.apiURL).toPromise()
    }

    getLojaByID(id: any): Observable<Result>{
        return this.client.get<Result>(`${this.apiURL}/${id}`);
    }

    getLojaByCNPJ(cnpj: any): Observable<Result>{
        return this.client.get<Result>(`${this.apiURL}/cnpj/${cnpj}`);
    }

    addLoja(loja: Loja): Observable<Result>{
        return this.client.post<Result>(this.apiURL, loja);
    }

    updateLoja(loja: Loja): Observable<Result>{
        return this.client.post<Result>(`${this.apiURL}/${loja.id}`, loja);
    }

    delLoja(id: Result): Observable<Result>{
        return this.client.delete<Result>(`${this.apiURL}/${id}`);
    }
}
