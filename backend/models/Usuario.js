const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Usuario = new Schema({
    nombre: {type:String},
    apellidos: {type:String},
    dni: {type:String},
    medico:{type:String}
},{collection:"usuarios"});


module.exports =mongoose.model("Usuario",Usuario);