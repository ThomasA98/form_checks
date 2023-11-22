function comprobar() {
    errores = "";

    comprobar_user();
    comprobar_numero();
    comprobar_correo();
    comprobar_run();

    document.getElementById("mensaje").innerHTML = errores;
}

function comprobar_user() {
    if (document.getElementById("user").value == "") {
        errores += "<li class='text-danger'>no ingresaste el usuario</li>";
    }
}

function comprobar_numero() {
    let numero = document.getElementById("numero").value;

    if (numero == "") {
        errores += "<li class='text-danger'>no ingreso el numero</li>";
    } else if (numero != parseInt(numero)) {
        errores += "<li class='text-danger'>el campo numero debe ser numerico</li>";
    }
}

function comprobar_correo() {
    let correo = document.getElementById("mail").value;

    if (correo == "") {
        errores += "<li class='text-danger'>no ingreso el correo</li>";
    } else {
        let vecCorreo = correo.split("@");
        if (vecCorreo.length != 2 || vecCorreo[1] == "") {
            errores += "<li class='text-danger'>el formato del correo no es valido</li>";
        }
    }
}

function comprobar_run() {
    let run = document.getElementById("run").value;

    if (run == "") {
        errores += "<li class='text-danger'>ingrese el run</li>";
    } else {

        let vecRun = run.split("-");

        if (vecRun.length == 2) {
            let multiplo = generador(2);

            let result = 11 - (vecRun[0]
                //separo los componentes
                .split("")
                //los ordeno de forma reversa
                .reverse()
                //a cada elemento lo parseo a int y lo multiplico por el retorno del generador
                .map(function (n) {
                                        //yield de secuencia [2..7]
                    return parseInt(n) * multiplo.next().value;
                })
                //calcula la suma de los elementos para luego calcular el modulos
                .reduce((accumulator, currentValue) => accumulator + currentValue) % 11);

            if (//si no se cumple una de las dos opciones envia el error
                !(result == vecRun[1] || (result == 10 && vecRun[1] == "k")
                )) {
                    errores += "<li class='text-danger'>el run no es valido</li>";
            }
        } else {
            errores += "<li class='text-danger'>el formato del run no es el correcto</li>";
        }
    }
}

function* generador(multiplo) {
    while (true) {
        yield multiplo;
        multiplo++;

        if (multiplo >= 8) {
            multiplo = 2;
        }
    }
}