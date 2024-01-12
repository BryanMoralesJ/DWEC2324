function generarTableroJS(){
    let tablero = document.getElementById("tablero");
    //variables con el tamño total del tablero que luego generamos de manera dinamica
    let numFilas = 9;
    let numColumnas = 9;

    for(let f=0; f<numFilas; f++){
        for(let c=0; c<numColumnas; c++){
            let crearDivs = document.createElement("div");
            tablero.appendChild(crearDivs);
        }
    }


}

function calcularNumMinas(x,y){

}

function numeroAleatorio(){

}

function colocarBombasTableroJS(){

}

function definirDificultar(dificultad){
}

generarTableroJS();