import { UsuarioCompleto } from './../../models/usuario';
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
  starsArr:any[] = [];
  /* starsArr:any[] = [[ {
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
}]]; */
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
        for(let i =0;i<this.listaCitas.length;i++){
          let numEstrellas = 0;
          let estrellas = this.stars;
          let numCalif = this.listaCitas[i].calif;
          if(numCalif!=null){
            numEstrellas = numCalif;
            estrellas.filter( st =>{
              if(st.id<=numEstrellas)
                st.class = 'star-gold star-hover star';
            })
          }
          this.starsArr[i] = estrellas;
        }
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    );
  }

   selectStar(estrellaClick: number,i:number): void {
    // prevent multiple selection

      this.starsArr[i].filter((star:any) => {
        if (star.id <= estrellaClick)
          star.class = 'star-gold star';
        else
          star.class = 'star-gray star';

          return star
      });


        this.listaCitas[i].calif = estrellaClick;
        this.citaS.updateCita(this.listaCitas[i]).subscribe(
          data =>{
            console.log(data);

          },
          err =>{
            console.log(err);
          }
        );


    }


  }



