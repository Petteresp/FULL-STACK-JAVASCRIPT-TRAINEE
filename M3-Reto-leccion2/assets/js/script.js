let base = prompt("por favor ingrese el valor de base:");
let altura = prompt("por favor ingrese el valor de la altura");


let area = (base * altura) / 2;

let tipo = prompt("por favor ingrese el tipo de triangulo:").toUpperCase();

document.write('<h1>el area del triangulo ' + tipo + ' de base ' + base + ' y altura ' + altura + ', es de ' + area);

