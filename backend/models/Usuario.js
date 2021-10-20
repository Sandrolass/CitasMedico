const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Usuario = new Schema({
    nombre: {type:String,required:true},
    apellidos: {type:String,required:true},
    dni: {type:String,required:true,unique:true},
    medico:{type:String,required:true}
},{collection:"usuarios"});


module.exports =mongoose.model("Usuario",Usuario);