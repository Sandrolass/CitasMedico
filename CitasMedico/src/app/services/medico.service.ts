import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  
  urlBase = environment.urlBase + "medicos";

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  }

  insertMedico(medico: Medico): Observable<any>{
    let url = this.urlBase;
    return this.http.post(url, medico, {responseType: 'json'})
      .pipe(
        catchError(e => {
          console.log(e); 
          return throwError(e);
        })
      );
  }

findMedicoById(id: any): Observable<any> {
  let url = this.urlBase+id;
  return this.http.get(url);
}

updateMedico(medico: Medico): Observable<any> {
  let url = this.urlBase+'/'+medico._id;
  console.log(url);
  delete medico._id;
  return this.http.put(url, medico);
}

deleteMedico(id:string): Observable<any> {
  let url = this.urlBase+id;
  return this.http.delete(url);
}



}
