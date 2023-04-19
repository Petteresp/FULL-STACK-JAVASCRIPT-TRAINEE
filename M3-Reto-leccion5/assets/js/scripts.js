
let cantidad = parseInt(prompt("ingrese cantidad de usuarios"));
let usuarios = [];

function main(){
for (let i = 0; i < cantidad; i++) {

let nombre = prompt("ingrese nombre del usuario: "+(i+1));
let fechaNacimiento = parseInt(prompt("ingrese año de nacimiento del usuario: "+(i+1)));
let password = (fechaNacimiento).toString(16) + Math.floor(Math.random() * 100 +1);
    
        let usuario = {
        nombre: nombre,
        id: i + 1,
        fechaNacimiento: fechaNacimiento,
        password: password
         };
    
        usuarios.push(usuario);
         
}
usuarios.forEach(element => {

     console.log("Nombre: "+element.nombre) 
     console.log("ID: "+element.id)
     console.log("Año: "+element.fechaNacimiento)
     console.log("Contraseña: "+element.password) 
     console.log("------------------------") 
        
});
console.log(usuarios);
};

main();


