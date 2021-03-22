
// ver como puedo hacer para agregar todos los atributos onclick a mi html desde JS


/* clase calculadora */
// voy a crear una clase calculadora la cual me va a ir guardando el ultimo boton apretado y el resultado y cuando aprete el boton voy a ir modificando estos valores.
//
/* idea */
// lo primero que debo apretar es un numero, si apreto una operacion y no hay nada en ultimo apretado entonces no debe hacer nada
//el numero que voy teniendo lo guardo en numeroActual
// luego si apreto un operador o igual entonces se fijará en ultimoOperadorApretado y si :
//                                                                                                                                      es "" entonces guardo numeroActual en resultado ya que es el primer numero que tengo
//                                                                                                                                      es "operador" entonces implica que resultado ya tiene un valor guardado, 
//                                                                                                                                                  por lo que hago resultado {opeardor} numeroActual.
// resumen:
// numeroActual: voy guardando el numero que voy teniendo en el momento.
// resultado: se actualizara cada vez que apreto un operador o igual.
// ultimoApretado: lo voy a utilizar para que no pueda arrancar con un operador o para que no pueda poner varios operadores juntos.
//ultimoOperadorApretado: lo voy a usar para saber que operacion tengo que hacer cuando aprete otro operador y así cambiar el valor de resultado dependiendo de este.

class calculadora {
    constructor() {
        this.numeroActual = 0;
        this.resultado = 0;
        this.ultimoApretado = "";
        this.ultimoOperadorApretado = "";
    }

    
    //setter
    cambiarUltimoApretado(type){
        this.ultimoApretado = type;
    }
    cambiarUltimoOperadorApretado(type) {
        this.ultimoOperadorApretado = type;
    }
    cambiarResultado() {
        if (this.ultimoOperadorApretado == ""){
            this.resultado = this.numeroActual;
        } else {
            // entonces tengo aplicar la operacion dada por el ultimoOperadorApretado
            if (this.ultimoOperadorApretado == "+") {
                this.resultado = parseFloat(this.resultado, 10) + parseFloat(this.numeroActual, 10);
            } else if (this.ultimoOperadorApretado == "-") {
                this.resultado = parseFloat(this.resultado, 10) - parseFloat(this.numeroActual, 10);
            } else if (this.ultimoOperadorApretado == "*") {
                this.resultado = parseFloat(this.resultado, 10) * parseFloat(this.numeroActual, 10);
            } else if (this.ultimoOperadorApretado == "/") {
                this.resultado = parseFloat(this.resultado, 10) / parseFloat(this.numeroActual, 10);
            } else if (this.ultimoOperadorApretado == "%") {
                this.resultado = parseFloat(this.resultado, 10) % parseFloat(this.numeroActual, 10);
            } else {
                // cuando es igual
            }
        }
        
    }
    cambiarNumeroActual(num){
        if ( /[+|-|*|%|/]/.test(this.ultimoApretado) || this.ultimoApretado == "-") {
            this.numeroActual = 0;
        }
        if (/[0-9]/.test(this.numeroActual) && this.numeroActual != 0){
            this.numeroActual += num;
        } else {
            this.numeroActual = num;
        }
    }

    // operar = (num, type) => {
    //     if (type = "+"){
    //         this.resutado += num;
    //     } else if (type = "-"){
    //         this.resutado -= num;
    //     }else if (type = "/"){
    //         this.resutado /= num;
    //     } else if (type = "*"){
    //         this.resutado *= num;
    //     } else {
    //         // resto
    //         this.resutado %= num;
    //     }
    // }
    reiniciar = ()=> {
        this.numeroActual = 0;
        this.resultado = 0;
        this.ultimoApretado = "";
        this.ultimoOperadorApretado = "";
    } 
}

let calc = new calculadora();



/* evento boton */
function apretarBoton (type) {
    let display = document.getElementById("display");
    let resultDisplay = document.getElementById("display-resultado")
    // si apreta C entonces reinicio el display y pongo resultado en cero
    if (type == "C"){
        display.innerHTML = "";
        calc.reiniciar();
        resultDisplay.innerHTML = "";
        // en caso de que se haya apretado una operacion
    } else if (/[+|=|*|%|/]/.test(type) || type == "-"){
        
        // el ultimoApretado es numero entonces: cambio el valor del resultado
        if (/[0-9]/.test(calc.ultimoApretado)){
            calc.cambiarUltimoApretado(type);
            calc.cambiarResultado();
            calc.cambiarUltimoOperadorApretado(type);
            // si salió igual entonces no tengo quep ponerlo en el display
            if (! (type == "=")){
                display.innerHTML += " " + type + " ";
            } else {
                // en el caso de que salió el igual deberia borrar el display y solo poner el resultado
                resultDisplay.innerHTML = calc.resultado;
                display.innerHTML = calc.resultado;
                calc.cambiarUltimoApretado("1");
            }
            // el ultimo apretado es un operador entonces tengo que reemplazarlo por el nuevo operador
        } else if (/[+|-|*|%|/]/.test(calc.ultimoApretado) ||type == "-") {
            display.innerHTML.replace(/.?/, "");
            calc.cambiarUltimoApretado(type);
            calc.cambiarUltimoOperadorApretado(type);
            // el ultimo apretado es "" entonces no me lo deberia permitir por lo que no hace nada
        }

        // en el caso de que se haya apretado un numero
    } else if (/[0-9]/.test(type) || type == ".") {
        display.innerHTML += type;
        calc.cambiarNumeroActual(type);
        calc.cambiarUltimoApretado(type);
        // este ultimo caso es cuando apreto el igual
    } else {
        // tengo que poner otro elemento en el div para que aparezca el valor del resultado.
        
    }
    
}