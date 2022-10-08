import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private client: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/report`;
  }

  readonly apiURL : string;

  getReport(data: any, template:any): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/generate-report/${template}`, data).toPromise();
  }

  downloadReport(fileName: any): Promise<any>{
    const headers = new HttpHeaders();
    return this.client.get<any>(`${this.apiURL}/download-report/${fileName}`,{ headers, responseType: 'blob' as 'json' }).toPromise();
  }
}
