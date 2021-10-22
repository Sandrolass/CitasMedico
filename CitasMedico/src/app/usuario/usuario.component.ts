import { MatDialog } from '@angular/material/dialog';
import { CalendarioComponent } from './../calendario/calendario.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ListaComponent } from './lista/lista.component';
import { Medico } from '../models/usuario';
import { CitaService } from '../services/cita.service';
import { MedicoService } from '../services/medico.service';
import { Cita } from '../models/cita';

export interface MedicoCal{
  medico:Medico,
  calif:number,
  numCalifs:number
}
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  listaMedicos:Medico[] = [];
  listaCalifs:MedicoCal[] = [];
  listaCitas:Cita[]= [];
   reducer = (previousValue:any,currentValue:any) => previousValue + currentValue;
  formGroup = this.fb.group({
    dni: [null, Validators.required],
    apellidos: [null, Validators.required]
  });

  
  

  constructor(private fb: FormBuilder, private usuariosService: UsuarioService, private route: ActivatedRoute,private dialog:MatDialog,
    private citaS:CitaService,private medicoS:MedicoService) { }

  ngOnInit(): void {
    this.limpiarFormulario();
    this.getAndSetInfoList();

  }

  enviar(){
      this.usuariosService.loginUser(this.formGroup.value).subscribe(data => {
        console.log("DESDE USUARIOS SERVICE:"); console.log(data)
        //Logica de lo que se necesite
         const dialogRef = this.dialog.open(CalendarioComponent,{width:"100%",maxWidth:'65%',height:'auto',data:data});
        dialogRef.afterClosed().subscribe(res => {
          console.log(res);
          const dialogRef2 = this.dialog.open(ListaComponent,{width:'80%',maxWidth:'65%',height:'auto',data:data.dni});
          dialogRef2.afterClosed().subscribe(res2 =>{
            console.log(res2);
          },
          err=>{
            console.log(err);
          })
        },
        err=>{
          console.log(err);
        })
      });

    this.limpiarFormulario();

  }

  limpiarFormulario() {
    this.formGroup = this.fb.group({
      dni: [null, Validators.required],
      apellidos: [null, Validators.required]
    });
  }

  getAndSetInfoList(){
    this.citaS.getCitas().subscribe(
      data=>{
        this.listaCitas = data;
        this.medicoS.getMedicos().subscribe(
          dataM =>{
            this.listaMedicos = dataM;
            this.construirCalifs();
            this.ordenarMedicos();
            console.log(this.listaCalifs);
          },
          errM =>{
            console.log(errM);
          }
        )
      },
      err=>{
        console.log(err);
      }
    )
  }
  construirCalifs(){
    for(let i=0;i<this.listaMedicos.length;i++){
      let citasFilt = this.listaCitas.filter(cita=> cita.refM == this.listaMedicos[i].refM);
      let obj:MedicoCal = {
        medico:this.listaMedicos[i],
        calif:Number.parseFloat(this.mediaCalifs(citasFilt).toFixed(1)),
        numCalifs:citasFilt.length
      }
      this.listaCalifs.push(obj);

    }
    
  }

  mediaCalifs(citasFilt:Cita[]):number{
    let califSum = 0;
    let califNoNull = 0
    for(let i = 0; i<citasFilt.length;i++){
      let calif = citasFilt[i].calif;
      if(calif!=null){
        califSum+=calif;
        califNoNull+=1;
      }
    }
    if(califNoNull == 0)
      return califSum;  
    else
      return califSum/califNoNull;
  }

  ordenarMedicos(){
    for(let i =1 ; i<this.listaCalifs.length;i++){
            
      for(let j = i ; j>0;j--){
          if(this.listaCalifs[j].calif>this.listaCalifs[j-1].calif){
              console.log("swap");
              let num = this.listaCalifs[j];
              this.listaCalifs[j]= this.listaCalifs[j-1];
              this.listaCalifs[j-1] = num;
          }
      }
  }
}

  


  
}
