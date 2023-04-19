import express from "express";   
import { v4 as uuid } from "uuid";
import {leerMascotas, guardarMacota, eliminarMascota, eliminarMascotasPropietario } from "./utils.js";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const port = 3000;

app.listen(port, () => 
console.log("servidor en el puerto: "+ port));


//GET sin parametros
app.get("/mascotas",(req, res) =>{

    try {
         res.json({code : 200 , data : leerMascotas()});

    } catch (error) {

        res.status(500).json({code: 500, message: "error de servidor"})
    }
     
});

//GET con parametro nombre de mascota
app.get("/mascotas/:nombre",(req, res) =>{

    try {
    let {nombre} = req.params;
    let filtroMascotas = leerMascotas().mascotas.filter (mascota =>
        mascota.nombre == nombre);

    res.json(filtroMascotas);

    } catch (error) {

        res.status(500).json({code : 500, message: "Error de servidor"});
    }
});

//GET con parametro run del dueño
app.get("/mascotas/propietario/:run", (req, res) => {

    try {
        let {run} = req.params;
        let filtroRun = leerMascotas().mascotas.filter (propietario => propietario.propietario.run == run );

    res.json(filtroRun); 
           
    } catch (error) {
        res.status(500).json({code : 500, message: "Error de servidor"});
    }
});

//POST agrega nueva mascota 
app.post("/mascotas", (req, res) =>{
    try {
        let {mascota , run , propietario} = req.body;
        if(!mascota || !run || !propietario){
          return res.status(400).json({code : 400, message : "Debe enviar todos los datos requeridos"});
        }

        let nuevaMascota = {
        id: uuid().slice(0,4),
        nombre: mascota,
        propietario: {
            run,
            nombre: propietario
        }}

   guardarMacota(nuevaMascota);

    } catch (error) {
        res.status(500).json({code : 500, message: "Error de servidor"});
    }
});

//eliminar mascota por nombre
app.delete("/mascotas/:nombre", (req, res) => {

    try {

        let {nombre} = req.params;
        if(eliminarMascota(nombre)){
        res.json({code: 200, message: `Mascota ${nombre} eliminada correctamente`});

        }else{
           res.status(400).json({code: 400, message: `Mascota ${nombre} no existe`});
        }
        
    } catch (error) {
        res.status(500).json({code : 500, message: "Error de servidor"});
    }
    

});

//eliminar mascota por run del propietario 

app.delete("/mascotas/propietario/:run", (req, res) =>{

    try {
        let {run} = req.params;
        if(eliminarMascotasPropietario(run)){
            res.json({code: 200, message : `Mascotas del propietario de run: ${run} eliminadas correctamente`})
        }
        else{
            res.status(400).json({code: 400, message: `Run: ${run} no existe`})
        }
       

    } catch (error) {
        res.status(500).json({code : 500, message: "Error de servidor"});
    }

});