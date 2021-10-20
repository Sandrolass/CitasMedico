import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase = environment.urlBase + "usuarios";

  constructor(private http: HttpClient) { }

  loginUser(credentials: any): Observable<any> {
    let url = this.urlBase + "getU/" + credentials.dni;
    return this.http.get(url);
  }
}
