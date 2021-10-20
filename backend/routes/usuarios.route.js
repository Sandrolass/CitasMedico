const express = require("express");
const app = express();
const usuarioRoute = express.Router();


let Usuario = require("../models/Usuario");

usuarioRoute.route("/").get((req,res,next)=>{
    console.log("descargando datos de pacientes");
    Usuario.find((err,data)=>{
        
        if(err){
            res.send(err);
            
        }else{
            res.json(data);
        }

    });
});

usuarioRoute.route("/:id").get((req,res,next)=>{
    console.log("descargando usuario por id");
    let id = req.params.id;
    Usuario.findById(id,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });

});


usuarioRoute.route("/").post((req,res,next)=>{
    console.log("creando usuario");
    let user = req.body;
    Usuario.create(user,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });
});

usuarioRoute.route("/:id").put((req,res,next)=>{
    console.log("actualizando usuario");
    let userUp = req.body;
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id,{$set:userUp},{new:true},(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    });

});

usuarioRoute.route("/:id").delete((req,res,next)=>{
    console.log("eliminando usuario");
    let id = req.params.id;
    Usuario.findByIdAndDelete(id,(err,data)=>{
        if(err){
            return next(err);
        }else{
            res.json(data);
        }
    })
})


module.exports = usuarioRoute;

