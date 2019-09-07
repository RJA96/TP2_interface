import {Circulo} from "./circulo.js"
export class Poligono{
    constructor(){
        this.circulos=[]
        this.centro
    }
    
    setCirculo(c){
        this.circulos.push(c);
    }
    drawlastcirculo(c){
        c.draw();
    }
    setCentro(c){
        this.centro = c;
    }

    getcantvertices(){
        return this.circulos.length;
    }
    unir(color, bool){
        if (this.circulos.length>1){
            let canvas = document.getElementById('canv');
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = color        
            ctx.moveTo(this.circulos[this.circulos.length-2].x,this.circulos[this.circulos.length-2].y);
            ctx.lineTo(this.circulos[this.circulos.length-1].x,this.circulos[this.circulos.length-1].y)
            ctx.stroke();
        }
        if (bool== true){
            let canvas = document.getElementById('canv');
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = color        
            ctx.moveTo(this.circulos[0].x,this.circulos[0].y);
            ctx.lineTo(this.circulos[this.circulos.length-1].x,this.circulos[this.circulos.length-1].y)
            ctx.stroke();
        }
    }
    getcentro(){
        let x=0;
        let y=0;
        for (let i = 0; i < this.circulos.length; i++) {
            let xaux = this.circulos[i].x;
            let yaux = this.circulos[i].y;
            x = x+xaux;
            y = y+yaux;
        }
        x = x/this.circulos.length;
        y = y/this.circulos.length;
        return {
            posX : x,
            posY: y
        }
    }
}