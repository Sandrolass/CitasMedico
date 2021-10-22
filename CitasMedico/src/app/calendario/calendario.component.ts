import { Fecha, Medico, UsuarioCompleto } from './../models/usuario';
import { Cita } from './../models/cita';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitaService } from '../services/cita.service';
import { MedicoService } from '../services/medico.service';



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
  disabledHours: boolean[];
  hoursControl = new FormControl('', Validators.required);
  fechaControl = new FormControl('', Validators.required);
  tipoDolor = new FormControl('', Validators.required);
  descripcion = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  hours: hour[] = [];

  constructor( 
    private formBuilder:FormBuilder,
    private citaService:CitaService,
    private medicoService: MedicoService,
    public dialogRef: MatDialogRef<CalendarioComponent>, @Inject(MAT_DIALOG_DATA) 
    public data:UsuarioCompleto)  
    {

      this.citasForm = formBuilder.group({
        fecha: this.fechaControl,
        hoursControl: this.hoursControl,
        tipoDolor: this.tipoDolor,
        descripcion: this.descripcion,

      });
    
    this.disabledHours = new Array();

    this.resetFlagDisabledHours();

    this.resetHoras();
    this.filtrarHoras();
   }

  resetFlagDisabledHours(){

    for (let i=0; i<23; i++){
      this.disabledHours[i] = false;
    }

  }
  resetHoras() {


    this.hours = new Array();
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
    
    if (this.citasForm.get('fecha')?.value) {
      let anio =  this.citasForm.get('fecha')?.value._i.year;
      let mes = this.citasForm.get('fecha')?.value._i.month;
      let dia = this.citasForm.get('fecha')?.value._i.date;
      let fechaSeleccionada = this.data.medico.fecha.filter((data:any) => data.dia == dia && data.mes == mes && data.agno == anio);

      if(fechaSeleccionada.length > 0){
        let horasFechaSeleccionada = fechaSeleccionada[0].horas.split('');

        for (let i=0; i<23; i++){

          if (horasFechaSeleccionada[i] == '0'){
            this.disabledHours[i] = true;

          } else {
            this.disabledHours[i]= false;
          }
          
        }
      } else {

        for (let i=0; i<23; i++){
            
            this.disabledHours[i]= true;
            console.log(this.disabledHours[i])
        }
      }
      
      
      this.resetHoras();
    

    }
    
    
  }


  pedirCita(){

    
    //variables de mes dia y año por separado
    let anio =  this.citasForm.get('fecha')?.value._i.year;
    let mes = this.citasForm.get('fecha')?.value._i.month;
    let dia = this.citasForm.get('fecha')?.value._i.date;

    //creación de Date
    let fecha = new Date(anio +"-"+ mes +"-"+ dia);
    
    //Creamos el objeto cita a partir de los datos del formulario y los datos que se reciben en el dialog
    let cita:Cita = {
      fecha: fecha,
      refUsuario: this.data.dni,
      refM: this.data.medico.refM,
      tipoDolor: this.citasForm.get('tipoDolor')?.value,
      descripcion: this.citasForm.get('descripcion')?.value,
      calif: null
    }

    //recibimos las fechas en las que el médico ya tiene horas asignadas para no duplicar las fechas.

    let fechasMedico:Fecha[] = this.data.medico.fecha;


    let fechaExistente = fechasMedico.filter((data:any) => data.dia == dia && data.mes == mes && data.agno == anio);
    
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
    } else {


      fechasMedico = fechasMedico.map((data:any) => { 
        if(data.dia == dia && data.mes == mes && data.agno == anio){

          let arrayHoras = data.horas.split('');

          let posicionCita:number = parseInt((this.citasForm.get('hoursControl')?.value.value))
          
          arrayHoras[posicionCita] = 1;
          
          data.horas = arrayHoras.join('');


        } 

        return data;
        
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

    
    this.citaService.insertCita(cita).subscribe(data => console.log(data));

    this.medicoService.updateMedico(medico).subscribe(data => console.log(data));

    
  }

  ngOnInit(): void {
  }
  

  close(){
    this.dialogRef.close();
  }

}
