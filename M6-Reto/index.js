const express = require('express');
const app = express();
const port = 3000;

let cartones = [];
let id = 0;
let auxiliar = {aux : 0};

app.use(express.static(__dirname + '/public'));

function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarCarton() {
  let numeros = [];
  while (numeros.length < 15) {
    let num = generarNumeroAleatorio(1, 30);
    if (!numeros.includes(num)) {
      numeros.push(num);
    }
  }
  id++
  let carton = {
    id,
    numeros
  };
  return carton;
}
//un auxiliar para no volver a generar los 5 cartones cuando se recargue la pagina.
app.get('/index', (req, res) =>{
  res.json(auxiliar);
  auxiliar.aux = 1;
});

//muestra los cartones.
app.get('/cartones', (req, res) => {
  res.json(cartones);
});

//genera un nuevo carton.
app.post('/cartones', (req, res) => {
    let carton = generarCarton();
  cartones.push(carton);
  res.status(201).json(carton);
});

app.listen(port, () => {
  console.log(`escuchando en el puerto: ${port}`);
});
