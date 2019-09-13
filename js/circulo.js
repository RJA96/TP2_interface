export class Circulo {
    constructor(x, y, radio, color) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
    }
    cambiarpos(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        let canvas = document.getElementById('canv');
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        ctx.stroke();
    }

    mover(x, y) {
        this.x = x;
        this.y = y;
    }
    eliminar() {
        this.delete;
    }
    meclickearon(posX, posY) {
        let d1 = Math.sqrt(Math.pow(posX - this.x, 2) + Math.pow(posY - this.y, 2));
        if (d1 < this.radio) return true;
        else return false;
    }
    mover_con_figura(x, y) {
        this.x += x;
        this.y += y;
    }
    cambiarColor(rgb) {
        this.color = rgb;
    }
}