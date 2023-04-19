let nombres = prompt("Ingrese tres nombres separados por comas");


document.querySelector(".nombres").textContent = nombres;

const letras = document.querySelector(".letras");

const comas = document.querySelector(".comas");


//console.log("Posicion de las letras:")

for (let i = 0; i < nombres.length; i++) {

if(nombres[i] !== ","){
   
    //console.log(`Posicon de la letra: ${nombres[i]} es : ${i}`);
    const h2Letras = document.createElement("h2");
     h2Letras.innerHTML = `Posicionde la letra ${nombres[i]} es : ${i}`;
     letras.appendChild(h2Letras);

};
   
};



//console.log("Posicion de las comas:");
let conteo = 1;
for (let i = 0; i < nombres.length; i++) {
    
    if(nombres[i] === ","){
    
        const h2comas= document.createElement("h2");
        h2comas.innerHTML = `Posicion de la coma ${conteo} es : ${i}`;
        comas.appendChild(h2comas);
        conteo++;

    //console.log(i);
    }
    
}