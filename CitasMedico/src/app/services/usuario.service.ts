import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase = environment.urlBase + "usuario";

  constructor(private http: HttpClient) { }

  loginUser(credentials: string): Observable<any> {
    let url = this.urlBase + credentials;
    return this.http.get(url);
  }
}
