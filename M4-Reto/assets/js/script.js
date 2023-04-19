class Rectangulo {
    constructor(x, y, ancho, alto) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }
};

class Canvas {
    constructor(id) {
        this.element = document.getElementById(id);
        this.context = this.element.getContext("2d");
    }

    dibujarRectangulo(rectangulo) {
        this.context.fillStyle = "black";
        this.context.fillRect(rectangulo.x, rectangulo.y, rectangulo.ancho, rectangulo.alto);
    }

};

let canvas = new Canvas("miCanvas");
let boton = document.getElementById("boton");

boton.addEventListener("click", function(){
    console.log("funciona");
    let x = Math.floor(Math.random() * canvas.element.width);
    let y = Math.floor(Math.random() * canvas.element.height);
    
    let rectangulo = new Rectangulo(x, y, 50, 25);
    canvas.dibujarRectangulo(rectangulo);
});

