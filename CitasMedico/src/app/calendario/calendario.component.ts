import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  hoursControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  hours: hour[] = [];

  constructor(public dialogRef: MatDialogRef<CalendarioComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }
  constructor() {
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
    console.log(this.hours)
   }

  ngOnInit(): void {
  }

}
