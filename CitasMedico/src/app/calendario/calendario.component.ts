import { Fecha, Medico, UsuarioCompleto } from './../models/usuario';
import { Cita } from './../models/cita';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitaService } from '../services/cita.service';



export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

interface hour {
  name: string;
  value: number;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class CalendarioComponent implements OnInit {
  
  citasForm: FormGroup;
  hoursControl = new FormControl('', Validators.required);
  fechaControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  hours: hour[] = [];

  constructor( 
    private formBuilder:FormBuilder,
    private citaService:CitaService,
    //private medicoService: Me
    public dialogRef: MatDialogRef<CalendarioComponent>, @Inject(MAT_DIALOG_DATA) 
    public data:UsuarioCompleto)  
    {

      this.citasForm = formBuilder.group({
        fecha: this.fechaControl,
        hoursControl: this.hoursControl
      });
    
    
    this.resetHoras();
    this.filtrarHoras();
   }

  resetHoras() {

    let minutes = ["00", "15", "30", "45"];
    let value = 0;
    for (let horas=8; horas<14; horas++) {
      for (let minutos=0; minutos<4; minutos++) {

        this.hours.push({
          value: value,
          name: horas+":"+minutes[minutos]
        })
        value++;
      }
    }
    this.hours.push({value:24, name:"14:00"})
  }

  filtrarHoras(){


    let fechas = this.data.medico.fecha;
    

    if (fechas.length === 0) {
      this.resetHoras();
    } else {


    }
 
  }

  pedirCita(){

    
    //variables de mes dia y año por separado
    let anio =  this.citasForm.get('fecha')?.value._i.year;
    let mes = this.citasForm.get('fecha')?.value._i.month;
    let dia = this.citasForm.get('fecha')?.value._i.date;

    //creación de Date
    let fecha = new Date(anio +"-"+ mes +"-"+ dia);
    

    let cita:Cita = {
      fecha: fecha,
      refUsuario: this.data.dni,
      medico: this.data.medico.nombre,
      tipoDolor: '',
      descripcion: '',
      calif: null
    }

    let fechasMedico:Fecha[] = this.data.medico.fecha;
    let fechaExistente = fechasMedico.filter((data:any) => data == fecha);
    let horas = new Array();

    if (fechaExistente.length == 0){
     
      for (let i=0; i<23; i++) {
        if (i == this.citasForm.get('hoursControl')?.value.value)
            horas.push('1');
          else {
            horas.push('0')
          }
        
      }

      let stringHoras = horas.join('');
      

      fechasMedico.push({
        dia: dia,
        mes: mes,
        agno: anio,
        horas: stringHoras
      })
    }

    
    let medico:Medico = {
      _id: this.data.medico._id,
      refM: this.data.medico.refM,
      nombre: this.data.medico.nombre,
      apellido: this.data.medico.apellido,
      dni: this.data.medico.dni,
      fecha: fechasMedico
      
    }

    
    this.citaService.insertCita(cita);

  }

  ngOnInit(): void {
  }
  

  close(){
    this.dialogRef.close();
  }

}
