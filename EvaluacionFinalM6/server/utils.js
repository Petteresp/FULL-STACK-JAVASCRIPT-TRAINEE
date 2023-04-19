import fs from "fs";
//funcion para leer los datos de mascotas.json
export const leerMascotas = () =>{
    let mascotas = fs.readFileSync("./mascotas.json", "utf8");
    return JSON.parse(mascotas);
   };
   
   //funcion para guardar nueva mascota
export const guardarMacota = (mascota) =>{
   
      let data = leerMascotas(); 
      data.mascotas.push(mascota);
      fs.writeFileSync("mascotas.json", JSON.stringify(data, null, 4), "utf-8");
   };
   
   //funcion para eliminar mascota por el nombre
export const eliminarMascota = (nombre) =>{
   
       let data = leerMascotas(); 
   
       if(data.mascotas.find (mascota =>mascota.nombre == nombre)){
       
       let filtroNombre = data.mascotas.filter (mascota =>mascota.nombre != nombre);
       data.mascotas = filtroNombre;
       fs.writeFileSync("mascotas.json", JSON.stringify(data, null, 4), "utf-8");
       return true;
       }
       else{
       return false;
       } 
       
   };
   
   //funcion para eliminar mascota por run del propietario
export const eliminarMascotasPropietario = (run) =>{
   
     let data = leerMascotas();
   
     if(data.mascotas.find (mascota => mascota.propietario.run == run)){
       let filtro = data.mascotas.filter (mascota => mascota.propietario.run != run);
       data.mascotas = filtro;
       fs.writeFileSync("mascotas.json", JSON.stringify(data, null, 4), "utf-8");
       return true;
     }else{
      return false; 
     }
   
   };