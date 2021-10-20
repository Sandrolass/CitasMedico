const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const dbconfig = require("./db/db");
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db,{useNewUrlParser:true}).then(
    ()=>{
        console.log("bbdd conectada");
    }, error =>{
        console.log(error);
    }
)
const port = 8080;

const usuarioRoute = require("./routes/usuarios.route");
const medicoRoute = require("./routes/medicos.route");
const citas = require("./routes/citas.route");
const citasRoute = require("./routes/citas.route");

app.use(cors());
app.use(express.json());

app.use("/usuarios",usuarioRoute);
app.use("/medicos",medicoRoute);
app.use("/citas",citasRoute);

app.get("/",(req,res)=>{
    res.send("hola");
});


const server = app.listen(8080,()=>{
    console.log("Escuchando puerto: " + port);
})



