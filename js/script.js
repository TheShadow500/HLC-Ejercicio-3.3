let errores = [];
let mensajes = [
    "El campo 'Fecha Actual' no puede quedar vacio",
    "La 'Fecha Actual' no es correcta. 'AAAA-MM-DD'",
    "La 'Fecha Actual' no existe",
    "La 'Fecha Actual' no coincide con el día de hoy",
    "El campo 'Fecha de Nacimiento' no puede quedar vacio",
    "La 'Fecha de Nacimiento' no es correcta. AAAA-MM-DD'",
    "La 'Fecha de Nacimiento' no existe",
    "La 'Fecha Actual' debe ser posterior a 'Fecha de Nacimiento'"
];

let boton = document.getElementById("calcular");
boton.addEventListener("click", function(){
    document.getElementById("resultado").innerHTML = "";
    errores = [];
    comprobarErrores();
    if(errores.length == 0){
        calcularEdad();
    }
    else{
        errorMensaje();
    }
})

let teclaFechaActual = document.getElementById("fechaactual");
teclaFechaActual.addEventListener("keypress", function(event){
    if(event.key != '-' && (event.key < '0' || event.key > '9')){
        event.preventDefault();
    }
})

let teclaFechaNacimiento = document.getElementById("fechanacimiento");
teclaFechaNacimiento.addEventListener("keypress", function(event){
    if(event.key != '-' && (event.key < '0' || event.key > '9')){
        event.preventDefault();
    }
})

function comprobarErrores(){
    const patronFecha = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    let fecha;
    let fecha2;

    fecha = document.getElementById("fechaactual").value;
    if(fecha == ""){
        errores.push(0);
    }
    else{
        if(!patronFecha.test(fecha)){
            errores.push(1);
        }
        else{
            if(!fechaValida(fecha)){
                errores.push(2)
            }
            else{
                if(!fechaHoy(fecha)){
                    errores.push(3);
                }
            }
        }
    }

    fecha2 = document.getElementById("fechanacimiento").value;
    if(fecha2 == ""){
        errores.push(4);
    }
    else{
        if(!patronFecha.test(fecha2)){
            errores.push(5);
        }
        else{
            if(!fechaValida(fecha2)){
                errores.push(6);
            }
        }
    }

    if(fecha < fecha2){
        errores.push(7);
    }
}

function errorMensaje(){
    (errores).forEach(error => {
        let contenido = document.createElement("div");
        contenido.innerHTML = mensajes[error];
        contenido.className = "errores";
        document.getElementById("resultado").appendChild(contenido);
    });
}

function fechaValida(fecha){
    let fechaDividida = fecha.split('-');
    let anio = parseInt(fechaDividida[0]);
    let mes = parseInt(fechaDividida[1]);
    let dia = parseInt(fechaDividida[2]);

    let fechaobjeto = new Date(anio, mes - 1, dia);
    return fechaobjeto.getFullYear() === anio && fechaobjeto.getMonth() === (mes - 1) && fechaobjeto.getDate() === dia;
}

function fechaHoy(fecha){
    let fechaActual = new Date();
    fechaActual = fechaActual.toISOString().slice(0,10);

    return fecha === fechaActual;
}

function calcularEdad(){
    let fecha1 = new Date(document.getElementById("fechanacimiento").value);
    let fecha2 = new Date(document.getElementById("fechaactual").value);

    let edad = fecha2.getFullYear() - fecha1.getFullYear();
    let edadTexto;

    if(fecha2.getMonth() < fecha1.getMonth() || (fecha2.getMonth() === fecha1.getMonth() && fecha2.getDate() < fecha1.getDate())){
        edadTexto = "Tienes " + (edad - 1) + " aunque este año cumplirás " + edad;
    }
    else{
        edadTexto = "Tienes " + edad + " y este año ya has cumplido edad";
    }

    let contenido = document.createElement("div");
    contenido.innerHTML = edadTexto;
    contenido.className = "infoedad";
    document.getElementById("resultado").appendChild(contenido);
}