import { Injectable } from '@angular/core';
import { Voucher } from '../models/voucher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private client: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/voucher`;
   }

  readonly apiURL : string;

  getVouchers(): Observable<Result>{
    return this.client.get<Result>(this.apiURL);
  }

  getVoucherByID(id: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/${id}`);
  }

  addVoucher(voucher: Voucher): Promise<Result>{
    return this.client.post<Result>(this.apiURL, voucher).toPromise();
  }

  getCupomByCodigo(codigo: any): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/voucher-codigo/${codigo}`).toPromise();
  }

  getCupomByCodigoWithUser(codigo: any): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/user-voucher/${codigo}`).toPromise();
  }

  delVoucher(id: any): Observable<Result>{
    return this.client.delete<Result>(`${this.apiURL}/${id}`);
  }

  getVouchersNaoSorteados(): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/'nao-sorteados/get`);
  }

  getVoucherByChaveAcesso(chave: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/chave-acesso/${chave}`);
  }

  getVoucherPendentes(): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}?aprovacaoPendente=true`).toPromise();
  }

  updateVoucher(voucher: any, codigo: any): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/${codigo}`, voucher).toPromise();
  }

  patchAprovar(chave: any): Promise<Result>{
    return this.client.patch<Result>(`${this.apiURL}/aprovar/${chave}`, { aprovacao_pendente: 'false'}).toPromise();
  }

  downloadComprovante(fileName: any): Promise<any>{
    const headers = new HttpHeaders();
    return this.client.get<any>(`${this.apiURL}/comprovantes/${fileName}`,{ headers, responseType: 'blob' as 'json' }).toPromise();
  }
}
