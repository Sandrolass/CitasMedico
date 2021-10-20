import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder, private usuariosService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  enviar(){    
      this.usuariosService.loginUser(this.formGroup.value).subscribe(data => {
        console.log("DESDE USUARIOS SERVICE:"); console.log(data)
        //Logica de lo que se necesite
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
