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
let moviendo = true;
let poliactual;
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
    if (poligonos[indice].getcantvertices() > 2) {
        document.querySelector("#unir").style.display = "block";

    }
}
document.querySelector("#reload").addEventListener("click",function(){
    location.reload(true)
})
canvas.addEventListener("click", fn_create)
document.querySelector("#crear").addEventListener("click",function () {
    canvas.addEventListener("click", fn_create)
    document.querySelector("#crear").style.display = "none";
    document.querySelector("#unir").style.display = "block";
})
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
        if ((moviendo==true)&&(active==true)){
            if (poliactual.circ == false) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                poliactual.P.mover(event.layerX, event.layerY);
                for (let i = 0; i < poligonos.length; i++) {
                    poligonos[i].drawPoligono();
                }
            }
            else{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                poliactual.P.moverVertice(event.layerX, event.layerY)
                for (let i = 0; i < poligonos.length; i++) {
                    poligonos[i].drawPoligono();
                }
            }
            
        }
    })
});
canvas.addEventListener("dblclick", function(){
    if (active) {
        console.log("dolbe");
        poliactual = get_poligono(event);
        if (poliactual.encontrado){
            if ((poliactual.circ == true)&&(poliactual.P.getcantvertices()>3)){
                poliactual.P.eliminarpunto(event.layerX, event.layerY);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < poligonos.length; i++) {
                    poligonos[i].drawPoligono();
                }
            }
            else{
                document.querySelector("#error").innerHTML = "El vertice que desea borrar pertenece a un poligono de menos de 4 lados"
                setTimeout(function(){ document.querySelector("#error").innerHTML =""; }, 2000);
            }
        }
    }
    
})

canvas.addEventListener("mouseup", function (event) {
    moviendo=false;
})

function get_poligono(event) {
    for (let i = 0; i < poligonos.length; i++) {
        if (poligonos[i].centro != null) {
            if (poligonos[i].centro.meclickearon(event.layerX,event.layerY) == true) {
                return {
                    encontrado:true,
                    P:poligonos[i],
                    circ:false

                }

            }
            if (poligonos[i].get_circulo_actual(event.layerX,event.layerY).encontrado){
                return{encontrado:true,
                    P:poligonos[i],
                    circ:poligonos[i].get_circulo_actual(event.layerX,event.layerY).encontrado
                };
                 
            }
        }
    }
    return{encontrado:false,
    };
}



function imprimeXY(e) {
    console.log(e.layerX);
    console.log(e.layerY);
}