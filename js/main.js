import {
    Circulo
} from "./circulo.js"
import {
    Poligono
} from "./poligono.js"
let poligonos = [];
let indice = 0;
let active = false;
let moviendo = true;
let poliactual;
const canvas = document.querySelector("#canv");
const ctx = canvas.getContext("2d");
let fn_create = function () {
    imprimeXY(event);
    if (poligonos[indice] == null) {
        poligonos[indice] = new Poligono();
    }
    let c = new Circulo(event.layerX, event.layerY, 10, "#ff0000");;
    poligonos[indice].setCirculo(c);
    poligonos[indice].drawlastcirculo();
    poligonos[indice].unir("#ffff00");
    if (poligonos[indice].getcantvertices() > 2) {
        document.querySelector("#unir").style.display = "block";

    }
}
canvas.addEventListener("click", fn_create)
document.querySelector("#reload").addEventListener("click", function () {
    poligonos = [];
    indice = 0;
    active = false;
    moviendo = true;
    poliactual = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

document.querySelector("#crear").addEventListener("click", function () {
    canvas.addEventListener("click", fn_create)
    document.querySelector("#crear").style.display = "none";
})
document.querySelector("#unir").addEventListener("click", function () {
    active = true;
    canvas.removeEventListener("click", fn_create)
    if (poligonos[indice].getcantvertices() > 2) {
        poligonos[indice].unir("#ffff00", true)
        let centro = poligonos[indice].getcentro();
        let c = new Circulo(centro.posX, centro.posY, 7, "#00ff00")
        c.draw();
        poligonos[indice].setCentro(c);
        indice++;
    }
    document.querySelector("#unir").style.display = "none";
    document.querySelector("#crear").style.display = "block";
})
canvas.addEventListener("mousedown", function () {
    if (active) {
        poliactual = get_poligono(event);
        if (poliactual.encontrado) {
            moviendo = true;
        }

    }

    canvas.addEventListener("mousemove", function () {
        if ((moviendo == true) && (active == true)) {
            if (poliactual.circ == false) {
                poliactual.P.mover(event.layerX, event.layerY);
                drawPoligonos();
            } else {
                poliactual.P.moverVertice(event.layerX, event.layerY)
                drawPoligonos();
            }

        }
    })
});


canvas.addEventListener("dblclick", function () {
    if (active) {
        poliactual = get_poligono(event);
        if (poliactual.encontrado) {
            if ((poliactual.circ == true) && (poliactual.P.getcantvertices() > 3)) {
                poliactual.P.eliminarpunto(event.layerX, event.layerY);
                drawPoligonos();
            } else {
                document.querySelector("#error").innerHTML = "El vertice que desea borrar pertenece a un poligono de menos de 4 lados"
                setTimeout(function () {
                    document.querySelector("#error").innerHTML = "";
                }, 2000);
            }
        }
    }

})
let verificar = false;
document.getElementById('canv').addEventListener("keydown",function(){    
    if (event.code == 'KeyC'){
        verificar = true;
        document.getElementById('canv').addEventListener("wheel", function () {
            if ((verificar)&&(active)){
                event.preventDefault();                
                cambiarColor(event);                
            }  
        })
    }
})
document.getElementById('canv').addEventListener("keyup",function(){
    verificar = false;
})

canvas.addEventListener("mouseup", function (event) {
    moviendo = false;
})

function get_poligono(event) {
    for (let i = 0; i < poligonos.length; i++) {
        if (poligonos[i].centro != null) {
            if (poligonos[i].centro.meclickearon(event.layerX, event.layerY) == true) {
                return {
                    encontrado: true,
                    P: poligonos[i],
                    circ: false

                }

            }
            if (poligonos[i].get_circulo_actual(event.layerX, event.layerY).encontrado) {
                return {
                    encontrado: true,
                    P: poligonos[i],
                    circ: poligonos[i].get_circulo_actual(event.layerX, event.layerY).encontrado
                };

            }
        }
    }
    return {
        encontrado: false,
    };
}

function drawPoligonos(color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < poligonos.length; i++) {
        if (color!=null){
            poligonos[i].drawPoligono(color);
        }
        else{
            poligonos[i].drawPoligono();
        }
        
    }
}

function imprimeXY(e) {
    console.log(e.layerX);
    console.log(e.layerY);
}
let auxcolor = 255;
function cambiarColor(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < poligonos.length; i++) {
        if ((e.deltaY < 0) && ((auxcolor >= 0)&&((auxcolor <255)))) {
            auxcolor++;
            
        }
        if ((e.deltaY > 0) && ((auxcolor > 0)&&((auxcolor <=255)))){
            auxcolor--;
        }
        poligonos[i].cambiarColor("rgb(" + auxcolor + ",0,0","rgb(0,"+auxcolor+",0");
    }
    drawPoligonos("rgb(0"+auxcolor+","+auxcolor+",0")
    
}