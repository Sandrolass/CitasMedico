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
  starsArr:any[] = [[ {
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
  }],[
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
  ],
[ {
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
}]];
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
    /* this.citaS.getCitasDni(this.data).subscribe(
      data => {
        this.listaCitas = data;
        for(let i =0;i<this.listaCitas.length;i++){
          this.starsArr[i]= [ {
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
          }]
        }
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    ); */
  }

  selectStar(value: any,i:number): void {
    // prevent multiple selection
    if (this.selectedRating < 6) {
      this.starsArr[i].filter((star:any) => {
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
