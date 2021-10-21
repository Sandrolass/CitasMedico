const express = require("express");
const app = express();
const medicoRoute = express.Router();

let Medico = require("../models/Medico");


medicoRoute.route("/").get((req,res,next)=>{
    console.log("descargando medicos");
    Medico.find((err,data)=>{
        if(err){
            return next(err);

        }else{
            res.json(data);
        }
    });
});

medicoRoute.route("/:id").get((req,res,next)=>{
    let id = req.params.id;
    Medico.findById(id,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
        
    });
});

medicoRoute.route("/").post((req,res,next)=>{
    let medico = req.body;
    Medico.create(medico,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

medicoRoute.route("/:id").put((req,res,next)=>{
    console.log("actualizando medico")
    let id = req.params.id;
    let medicoUp = req.body;

    Medico.findByIdAndUpdate(id,{$set:medicoUp},{new:true},(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

medicoRoute.route("/:id").delete((req,res,next)=>{
    let id = req.params.id;
    Medico.findByIdAndDelete(id,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

module.exports = medicoRoute;