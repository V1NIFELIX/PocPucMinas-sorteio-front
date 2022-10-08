
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoteriaService {

  constructor(public http: HttpClient) { }


  getNumberLoteria() {
    return this.http.get(`${environment.url_loteria}/loteria`);
  }


}
