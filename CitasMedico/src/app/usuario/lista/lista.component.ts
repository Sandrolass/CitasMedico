import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/cita';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  listaCitas:Cita[] = [];
  constructor(MatDialogRef:MatDialogRef<ListaComponent>,@Inject(MAT_DIALOG_DATA) public data:String,private citaS: CitaService) { }

  ngOnInit(): void {
    this.citaS.getCitasDni(this.data).subscribe(
      data => {
        this.listaCitas = data;
      },
      err=>{
        console.log(err);
      }
    );
  }

}
