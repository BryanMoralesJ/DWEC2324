window.addEventListener("DOMContentLoaded", () => {

    // botón submit
    let submit = document.addEventListener("click",validar,false);

    // Funcion validar nombre
    function validarNombre(){
        let nombre = document.getElementById("nombre");
        if(!nombre.checkValidity){

            if(nombre.validity.valueMissing){
                mostrarErrores(nombre,"El cuadro de texto se encuentra vacío");
                return false;
            }
        }
        return true;
    }

     // función para validar la letra del NIF
     function validarLetraNif(element){
        const LETRAS =  ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
        let numeros = element.substring(0,element.length-1);
        let letra = element.substring(element.length-1);
        let rest = numeros % 23;

        return (LETRAS[rest] === letra) ? true : false;
    }

    // función para mostrar los errores
    function mostrarErrores(element, msg){
        let errores = document.getElementById("errores");
        errores.innerHTML = msg;
        element.className = "error";
        element.focus();
    }

    function validar(e){
        console.log(validarLetraNif("50584949Z"));
    }

}, false);