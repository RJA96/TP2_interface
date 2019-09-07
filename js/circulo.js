export class Circulo{
    constructor(x, y, radio, color){
        this.x=x;
        this.y=y;
        this.radio=radio;
        this.color=color;
    }
    cambiarpos(x,y){
        this.x=x;
        this.y=y;
    }
    draw(){
        let canvas = document.getElementById('canv');
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        ctx.stroke();
    }
    meclickearon(e){
        let d1 = Math.sqrt(Math.pow(e.layerX-this.x,2)+Math.pow(e.layerY-this.y,2))
        if (d1<this.radio) return true;
        else return false;
    }
    mover(x,y){
        this.x += x;
       this.y += y;
    }
}