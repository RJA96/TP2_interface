import {
    Circulo
} from "./circulo.js"
import {
    Poligono
} from "./poligono.js"
//usar booleans para sacar los remove event list
let poligonos = [];
let indice = 0;
let active = false;
const canvas = document.querySelector("#canv");
const ctx= canvas.getContext("2d");
let fn_create = function () {
    imprimeXY(event);
    if (poligonos[indice] == null) {
        poligonos[indice] = new Poligono();
    }
    let c = new Circulo(event.layerX, event.layerY, 10, "#ff0000");;
    poligonos[indice].setCirculo(c);
    poligonos[indice].drawlastcirculo();
    poligonos[indice].unir("#ffff00");
}

canvas.addEventListener("click", fn_create)

document.querySelector("#unir").addEventListener("click", function () {
    active = true;
    canvas.removeEventListener("click", fn_create)
    if (poligonos[indice].getcantvertices() > 2) {
        poligonos[indice].unir("#ffff00", true)
        let centro = poligonos[indice].getcentro();
        let c = new Circulo(centro.posX, centro.posY, 7, "#008000")
        c.draw();
        poligonos[indice].setCentro(c);
        indice++;
    }
})
canvas.addEventListener("mousedown", function () {
    if (active) {
        var poliactual = get_poligono(event).P;
    }
    
    canvas.addEventListener("mousemove", function () { 
        //aca hay que agregar get circulo con una funcion circulo/poligono que si no es el centro lo traiga
        if ((active==true)&&(poliactual!=null)){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            poliactual.mover(event);
        }
    
    })
});


canvas.addEventListener("mouseup", function (event) {
    active = false;
})

function get_poligono(event) {
    let poligonoaux;
    for (let i = 0; i < poligonos.length; i++) {
        if (poligonos[i].centro != null) {
            if (poligonos[i].centro.meclickearon(event.layerX,event.layerY) == true) {
                return {P:poligonos[i]
                }
            }
            if (//aca va si lo clikearon a uno que pertenece al poligono)
        }

    }
   // return poligonoaux
}



function imprimeXY(e) {
    console.log(e.layerX);
    console.log(e.layerY);
}