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
  
  
  

  constructor(public dialogRef:MatDialogRef<ListaComponent>,@Inject(MAT_DIALOG_DATA) public data:String,private citaS: CitaService) { }

  ngOnInit(): void {
     this.citaS.getCitasDni(this.data).subscribe(
      data => {
        this.ordenarPorFechas(data);
        this.listaCitas = data;
        for(let i =0;i<this.listaCitas.length;i++){
          let numEstrellas = 0;
          let estrellas = this.devuelveEstrellas();
          let numCalif = this.listaCitas[i].calif;
          if(numCalif!=null){
            numEstrellas = numCalif;
            estrellas.map( st =>{
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
    
       this.starsArr[i].map( (s:any) =>{
          if(s.id<=estrellaClick){
            s.class = 'star-gold star-hover star';
          }else{
            s.class = 'star-gray star-hover star';
          }
      } );
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

    devuelveEstrellas():any[]{
      let estrellas =  [
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
      return estrellas;
    }
    ordenarPorFechas(citas:Cita[]){
      citas.map(i => i.fecha = new Date(i.fecha));
      //algoritmo de insertion sort
        for(let i =1 ; i<citas.length;i++){
            
            for(let j = i ; j>0;j--){
                if(citas[j].fecha.getTime()<citas[j-1].fecha.getTime()){
                    console.log("swap");
                    let num = citas[j];
                    citas[j]= citas[j-1];
                    citas[j-1] = num;
                }
            }
        }
        
    
    }

    close(){
      this.dialogRef.close();
    }


  }



