const mongoose = require("mongoose");

const Schema = mongoose.Schema;



let Fecha = new Schema({
    dia:{type:Number},
    mes:{type:Number},
    agno:{type:Number},
    horas:{type:String}
});


let Medico = new Schema({
    nombre:{type:String},
    apellido:{type:String},
    dni:{type:String},
    refM:{type:String},
    fecha:[Fecha]
},{collection:"medicos"});

module.exports = mongoose.model("Medico",Medico);

