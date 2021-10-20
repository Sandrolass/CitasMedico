import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  loginUser(credentials: string): Observable<any> {
    let url = this.urlBase + credentials;
    return this.http.get(url);
  }
}
