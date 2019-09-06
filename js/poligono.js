export class Poligono{
    constructor(){
        this.circulos=[]
        this.centro
    }
    pushCirculo(c){
        this.circulos.push(c);
    }
    drawcirculo(i){
        this.circulos(i).draw;
    }
    pushCentro(c){
        this.centro = c;
    }
    unir(){
        
    }
}