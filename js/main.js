import { Linea } from "./linea.js";
import { Vertice } from "./vertice.js";
let poligono = [];
document.querySelector("#canv").addEventListener("click", function(){
    imprimeXY(event);
    let v = crearCirculo(event);
    dibujar (v.posX,v.posY,50)
    poligono.push(v);
    if (poligono.length>1){
        let l = new Linea (poligono[poligono.length-2],poligono[poligono.length-1]);
        dibujarLinea(l);        
    }
})
document.querySelector("#unir").addEventListener("click",function(){
    if (poligono.length>2){
        let l = new Linea (poligono[0],poligono[poligono.length-1]);
        dibujarLinea(l);
        let c = centro();
        let va = new Vertice(c.posX,c.posY);
        dibujar(va.posX,va.posY,50)
        
              
    }
})
function centro(){
    let x=0;
    let y=0;
    for (let i = 0; i < poligono.length; i++) {
        let xaux = poligono[i].posX;
        let yaux = poligono[i].posY;
        x = x+xaux;
        y = y+yaux;
    }
    x = x/poligono.length;
    y = y/poligono.length;
    return {
        posX : x,
        posY: y
    }
}
function crearCirculo(e){
    let c = new Vertice(e.layerX,e.layerY);
    return c;    
    
}
function imprimeXY (e){
    console.log(e.layerX);
    console.log(e.layerY);   
}

function dibujar(x,y,radio){
    let canvas = document.getElementById('canv');
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#000000"
    ctx.arc(x, y, radio, 0, 2 * Math.PI);
    ctx.stroke();
}

function dibujarLinea (L){
    let canvas = document.getElementById('canv');
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#ffff00"
    ctx.moveTo(L.vertice1.posX,L.vertice1.posY);
    ctx.lineTo(L.vertice2.posX,L.vertice2.posY)
    ctx.stroke();
}