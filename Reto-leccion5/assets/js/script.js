const boton = document.getElementById('clicker');

let contador = 0;

boton.addEventListener('click', function() {

   contador++;

   boton.innerHTML = contador;
    
});