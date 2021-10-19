const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const dbconfig = require("./db/db");
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    
})


const server = app.listen(8080,()=>{
    console.log("Escuchando puerto: " + port);
})

