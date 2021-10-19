const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Cita = new Schema({
    fecha:{type:Date},
    refUsuario:{type:String},
    refM:{type:String},
    tipoDolor:{type:String},
    descripcion:{type:String}
},{collection:"citas"});

module.exports = mongoose.model("Cita",Cita);