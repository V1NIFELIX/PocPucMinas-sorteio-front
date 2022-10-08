
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(public http: HttpClient) { }

  getInfo(qrcode) {
    let data = {"chave": qrcode}
    return this.http.post(`${environment.url_qrcode}/qrcode`, data);
  }

}
