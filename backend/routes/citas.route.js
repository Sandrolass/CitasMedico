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
    let dni = req.params.dni;
    Cita.find({refUsuario:dni},(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

/* citasRoute.route("/").post((req,res,next)=>{
    Cita.find()
}) */

