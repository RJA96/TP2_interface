import {
    Circulo
} from "./circulo.js"
import {
    Poligono
} from "./poligono.js"
//usar booleans para sacar los remove event list
let ps = [];
let indice = 0;
let active = false;
const canvas = document.querySelector("#canv");
const ctx= canvas.getContext("2d");
let fn_create = function () {
    imprimeXY(event);
    if (ps[indice] == null) {
        ps[indice] = new Poligono();
    }
    let c = new Circulo(event.layerX, event.layerY, 50, "#ff0000");;
    c.draw;
    ps[indice].setCirculo(c);
    c.draw();
    ps[indice].unir("#ffff00");
}

let fn_move = 
canvas.addEventListener("click", fn_create)

document.querySelector("#unir").addEventListener("click", function () {
    canvas.removeEventListener("click", fn_create)
    if (ps[indice].getcantvertices() > 2) {
        ps[indice].unir("#ffff00", true)
        let centro = ps[indice].getcentro();
        let c = new Circulo(centro.posX, centro.posY, 30, "#ff0000")
        c.draw();
        ps[indice].setCentro(c);
        indice++;
    }
})
canvas.addEventListener("mousedown", function () {
    active = true;
    
});
canvas.addEventListener("mousemove", function () { 
    let poliactual = get_poligono(event);
         
    if ((active==true)&&(poliactual!=null)){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        poliactual.mover(event);
    }

})

canvas.addEventListener("mouseup", function (event) {
    active = false;
})

function get_poligono(event) {
    let poligonoaux;
    for (let i = 0; i < ps.length; i++) {
        if (ps[i].centro != null) {
            if (ps[i].centro.meclickearon(event) == true) {
                poligonoaux = ps[i];
            }
        }
    }
    if (poligonoaux != null) {
        return poligonoaux
    }
}



function imprimeXY(e) {
    console.log(e.layerX);
    console.log(e.layerY);
}