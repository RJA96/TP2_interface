import {
    Circulo
} from "./circulo.js"
export class Poligono {
    constructor() {
        this.circulos = []
        this.centro
    }

    setCirculo(c) {
        this.circulos.push(c);
    }
    drawlastcirculo() {
        this.circulos[this.circulos.length - 1].draw();
    }
    setCentro(c) {
        this.centro = c;
    }

    getcantvertices() {
        return this.circulos.length;
    }
    unir(color, ultimoyprimero) {
        if (this.circulos.length > 1) {
            let canvas = document.getElementById('canv');
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = color
            ctx.moveTo(this.circulos[this.circulos.length - 2].x, this.circulos[this.circulos.length - 2].y);
            ctx.lineTo(this.circulos[this.circulos.length - 1].x, this.circulos[this.circulos.length - 1].y)
            ctx.stroke();
        }
        if (ultimoyprimero == true) {
            let canvas = document.getElementById('canv');
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = color
            ctx.moveTo(this.circulos[0].x, this.circulos[0].y);
            ctx.lineTo(this.circulos[this.circulos.length - 1].x, this.circulos[this.circulos.length - 1].y)
            ctx.stroke();
        }
    }
    unirtodos(color) {
        for (let i = 0; i < this.circulos.length - 1; i++) {
            let canvas = document.getElementById('canv');
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = color
            ctx.moveTo(this.circulos[i].x, this.circulos[i].y);
            ctx.lineTo(this.circulos[i + 1].x, this.circulos[i + 1].y)
            ctx.stroke();
        }
        this.unir("ffff00", true)
    }
    getcentro() {
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.circulos.length; i++) {
            let xaux = this.circulos[i].x;
            let yaux = this.circulos[i].y;
            x = x + xaux;
            y = y + yaux;
        }
        x = x / this.circulos.length;
        y = y / this.circulos.length;
        return {
            posX: x,
            posY: y
        }
    }
    mover(e) {
        this.centro.draw()
        for (let i = 0; i < this.circulos.length; i++) {
            this.circulos[i].mover_con_figura(e.layerX - this.centro.x, e.layerY - this.centro.y)
            this.circulos[i].draw()
        }
        this.centro.cambiarpos(e.layerX, e.layerY)
        this.unirtodos("#ffff00");

    }
    get_circulo_actual(posX,posY){
        for (let i = 0; o < this.circulos.length; i++) {
            this.circulos[i].meclickearon(posX,posY)
            
        }
    }
}
//thisX += x -x centro