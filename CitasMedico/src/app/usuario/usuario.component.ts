import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
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

  constructor(private fb: FormBuilder, private usuariosService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  enviar(){    
      this.usuariosService.loginUser(this.formGroup.value).subscribe(
        () => {
          //this.router.navigate(['/calendario']);
          },
        (err: any) => {
            return throwError(err);
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
