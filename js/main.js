function punto1(){
    let canvas = document.querySelector("#canv");
    canvas.onclick = function(event){
        imprimeXY(event)
    }
}

function imprimeXY (event){
    console.log(event.screenX);
    console.log(event.screenY);
    
    
}