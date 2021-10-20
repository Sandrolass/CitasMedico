const mongoose = require("mongoose");

const Schema = mongoose.Schema;



let Fecha = new Schema({
    dia:{type:Number},
    mes:{type:Number},
    agno:{type:Number},
    horas:{type:String}
});


let Medico = new Schema({
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    dni:{type:String,required:true,unique:true},
    refM:{type:String,required:true},
    fecha:[Fecha]
},{collection:"medicos"});

module.exports = mongoose.model("Medico",Medico);

