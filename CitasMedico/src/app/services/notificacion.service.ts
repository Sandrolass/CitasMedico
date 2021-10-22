import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private snackBar:MatSnackBar) { }

  openNotification(message:string){
    this.snackBar.open(message, undefined, {duration: 10 *1000})
  }
}
