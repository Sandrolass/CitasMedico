const express = require("express");
const app = express();
const citasRoute = express.Router();

let Cita = require("../models/Cita");


citasRoute.route("/").get((req,res,next)=>{
    console.log("descargando citas");
    Cita.find((err,data)=>{
        if(err){
            res.next(err);

        }else{
            res.json(data);
        }
    });
});

citasRoute.route("/:id").get((req,res,next)=>{
    console.log("descagando cita por id");
    let id = req.params.id;
    Cita.findById(id,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

citasRoute.route("/getC/:refM").get((req,res,next)=>{
    console.log("descargando citas por medico");
    let refM = req.params.refM;
    Cita.find({refM:refM},(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

citasRoute.route("/getU/:dni").get((req,res,next)=>{
    console.log("descargando cita por dni");
    let dni = req.params.dni;
    Cita.find({refUsuario:dni},(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

 citasRoute.route("/").post((req,res,next)=>{
     console.log("creando cita");
     let cita = req.body;
    Cita.create(cita,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

citasRoute.route("/:id").put((req,res,next)=>{
    console.log("actualizando cita")
    let id = req.params.id;
    let citaUp = req.body;
    Cita.findByIdAndUpdate(id,{$set:citaUp},{new:true},(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});
citasRoute.route("/:id").delete((req,res,next)=>{
    console.log("eliminando cita");
    let id = req.params.id;
    Cita.findByIdAndDelete(id,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

module.exports = citasRoute;

