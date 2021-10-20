import { MatDialog } from '@angular/material/dialog';
import { CalendarioComponent } from './../calendario/calendario.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  formGroup = this.fb.group({
    dni: [null, Validators.required],
    apellidos: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private usuariosService: UsuarioService, private route: ActivatedRoute,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  enviar(){
      this.usuariosService.loginUser(this.formGroup.value).subscribe(data => {
        console.log("DESDE USUARIOS SERVICE:"); console.log(data)
        //Logica de lo que se necesite
         const dialogRef = this.dialog.open(CalendarioComponent,{width:"100%$",maxWidth:'65%',height:'auto',data:data});
        dialogRef.afterClosed().subscribe(res => {
          console.log(res);
        })
      });

    this.limpiarFormulario();

  }

  limpiarFormulario() {
    this.formGroup.setValue({
      dni:"",
      apellidos: ""
    });
  }

}
