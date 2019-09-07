import {Circulo} from "./circulo.js"
import {Poligono} from "./poligono.js"
let ps = [];
let indice = 0;
document.querySelector("#canv").addEventListener("click", function(){
    imprimeXY(event);
    if (ps[indice]==null){
        ps[indice] = new Poligono();
    }
    let c = new Circulo(event.layerX,event.layerY,50,"#ff0000");;
    c.drow;
    ps[indice].setCirculo(c);
    console.log(ps[indice]);
    c.drow();
    ps[indice].unir("#ffff00");
})

document.querySelector("#unir").addEventListener("click",function(){
    if (ps[indice].getcantvertices()>2){
        ps[indice].unir("#ffff00",true)
        let centro = ps[indice].getcentro();        
        let c = new Circulo(centro.posX,centro.posY,30,"#ff0000")
        c.drow();
        ps[indice].setCentro(c);
        indice++;
    }
})

document.querySelector("#canv").addEventListener("mousedown", function(event){
    event.preventDefault()
    for (let i = 0; i < ps.length; i++) {
        if (ps[i].centro != null) {
            if( ps[i].centro.meclickearon(event)==true){
                console.log("mover");
            }   
        }
       
    }
})
document.querySelector("#canv").addEventListener("mouseup", function(event){
    event.preventDefault()
    console.log("arriba");
    
})



function imprimeXY (e){
    console.log(e.layerX);
    console.log(e.layerY);   
}