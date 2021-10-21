import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cita } from '../models/cita';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  urlBase = environment.urlBase + "citas";

  constructor(private http: HttpClient) { }

  getCitas(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  }
  getCitasDni(dni:String):Observable<any>{
    let url = this.urlBase + "/getU/" + dni;
    return this.http.get(url);
  }

  insertCita(cita: Cita): Observable<any> {

 
    let url = this.urlBase;
    console.log(url);
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
