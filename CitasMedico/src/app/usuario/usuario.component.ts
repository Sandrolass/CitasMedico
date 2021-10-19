import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  enviar(){

    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.formGroup.setValue({
      dni:"", 
      apellidos: ""
    });
  }

}
