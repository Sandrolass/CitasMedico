const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Cita = new Schema({
    fecha:{type:Date},
    refUsuario:{type:String,required:true},
    refM:{type:String,required:true},
    tipoDolor:{type:String,required:true},
    descripcion:{type:String}
},{collection:"citas"});

module.exports = mongoose.model("Cita",Cita);