import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private client: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/user`;
  }

  readonly apiURL : string;

  getUsers(): Observable<Result>{
    return this.client.get<Result>(this.apiURL);
  }

  getUserByID(id: any): Observable<Result>{
    return this.client.get<Result>(`${this.apiURL}/${id}`);
  }

  getUserByEmail(email: any): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/email/${email}`).toPromise();
  }

  bloqueiaUserByEmail(email: any): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/bloqueia/${email}`).toPromise();
  }

  bloqueados(): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/bloqueados/get`).toPromise();
  }

  bloqueadosByEmail(email): Promise<Result>{
    return this.client.get<Result>(`${this.apiURL}/bloqueados/get/${email}`).toPromise();
  }


  addUser(user: User): Promise<Result>{
    return this.client.post<Result>(this.apiURL, user).toPromise();
  }

  updateUser(user: User): Promise<Result>{
    return this.client.post<Result>(`${this.apiURL}/${user.id}`, user).toPromise();
  }

  delUser(id: any): Observable<Result>{
    return this.client.delete<Result>(`${this.apiURL}/${id}`);
  }
}
