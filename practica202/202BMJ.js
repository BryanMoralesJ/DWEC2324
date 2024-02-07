window.addEventListener("DOMContentLoaded", () => { // Con esto conseguimos que todo este cargado

    let submit = document.getElementById("submit");
    let redirigir = document.getElementById("redirigir");
    let curso = document.getElementById("curso");
    let mensaje = document.getElementById("mensaje");
    let contador = document.getElementById("contador");
    let todos = document.getElementById("todos");
    let ninguno = document.getElementById("ninguno");

    // al pulsar sobre la opción añadir curso se solicita que agrege un nuevo curso academico
    curso.addEventListener("change", () => {
        if(curso.value === "add"){
            let guardarCurso = prompt("Ingresa la fecha del curso", "24-25");
            let crearElemento = document.createElement("option");
            crearElemento.value = guardarCurso;
            crearElemento.text = guardarCurso;
            curso.insertBefore(crearElemento,curso.lastElementChild);
        }
    } , false);

    // evento para validar si pulso el checkbox "todos"
    todos.addEventListener("change", function() {
        let checkboxes = document.querySelectorAll('input[name="diasDisponibles"]');
        if (this.checked) {
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = true;
            });
        }
    });

    // evento para validar si pulso el checkbox "ninguno"
    ninguno.addEventListener("change", function() {
        let checkboxes = document.querySelectorAll('input[name="diasDisponibles"]');
        if (this.checked) {
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });
        }
    });

    // al escribir sobre el textarea el id #contador se ira actualizando
    mensaje.addEventListener("input", actualizarContador);

    // al pulsar el botón se redirige a la página de Google
    redirigir.addEventListener("click", () => {
        location.href = "https://google.com";
    }, false);

    // al pulsar el botón submit validamos que todos los campos cumplan con lo indicado
    submit.addEventListener("submit",validar, false);

    // función validar nombre
    function validarNombre(){
        let nombre = document.getElementById("nombre");
        if(!nombre.checkValidity){
            if(nombre.validity.valueMissing){
                return false;
            }
        }
        return true;
    }

    // función para validar el textarea
    function validarTexto() {
        mensaje.value;
        // Validar la longitud del texto
        if (mensaje.length >= 2 && mensaje.length <= 500) {
            return true;
        }
        return false;
    }

    // funcion para mostrar los caracteres que faltan para llegar a 500
    function actualizarContador() {
        let maxLength = 500;
        let currentLength = mensaje.value.length;
        let caracteresRestantes = maxLength - currentLength;
        contador.textContent = caracteresRestantes;
    }


     // función para validar la letra del NIF
     function validarLetraNif(element){
        const LETRAS =  ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
        let numeros = element.substring(0,element.length-1);
        let letra = element.substring(element.length-1);
        let rest = numeros % 23;

        return (LETRAS[rest] === letra) ? true : false;
    }

    // funcion para comprobar que más de 2 días disponibles se seleccionen
    function checkSelected() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let checkedCount = 0;
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkedCount++;
            }
        });
        if (checkedCount >= 2) {
            return true;
        }
        return false;
    }

    function validar(e) {
        let nif = document.getElementById("nif").value;
        if (!checkSelected() || !validarLetraNif(nif) || !validarNombre() || !validarTexto()) {
            e.preventDefault();
        }
    }

}, false);