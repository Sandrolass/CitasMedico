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

  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }

  ];

  constructor(MatDialogRef:MatDialogRef<ListaComponent>,@Inject(MAT_DIALOG_DATA) public data:String,private citaS: CitaService) { }

  ngOnInit(): void {
    this.citaS.getCitasDni(this.data).subscribe(
      data => {
        this.listaCitas = data;
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    );
  }

  selectStar(value: any): void {
    // prevent multiple selection
    if (this.selectedRating < 6) {
      this.stars.filter((star) => {
        if (star.id <= value) {
          star.class = 'star-gold star';
        } else {
          star.class = 'star-gray star';
        }

        return star;
      });
    }

    this.selectedRating = value;
  }


}
