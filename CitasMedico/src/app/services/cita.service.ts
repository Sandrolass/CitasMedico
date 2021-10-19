import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cita } from '../models/cita';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  /* Aquí o en enviroment como se prefiera */
  urlBase = "http://localhost:4000/cita/";

  constructor(private http: HttpClient) { }

  getCitas(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  }

  insertCita(cita: Cita): Observable<any> {
    let url = this.urlBase;
    return this.http.post(url, cita, { responseType: 'json' })
      .pipe(
        catchError(e => {
          console.log(e);
          return throwError(e);
        })
      );
  }

  deleteCita(id: string): Observable<any> {
    let url = this.urlBase + id;
    return this.http.delete(url);
  }

}
