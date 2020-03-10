// ---------------------------------------------------------------------------------------------------------------------
//
// Universidad de La Laguna
// Escuela Superior de Ingeniería y Tecnología
// Grado en Ingeniería Informática
// Asignatura: Programacion de Aplicaciones Interactivas (PAI)
// Curso: 3º Itinerario 1
// Práctica 4 PAI - Problema de las 8 Reinas
// Autor: Christian Torres Gonzalez
// Correo: alu0101137902@ull.edu.es
// Fecha: 22/02/2020
//
// Funcion implementada para calcular todos aquellos numeros que en base 3, no contienen nigun dos. Por ejemplo:
//      - El numero 12: en vase 3 es (1*3^2) + (1*3^1) + (1*3^0) = 9 + 3 + 0 = 12
//      - El numero 14: en base 3 es (1*3^2) + (1*3^1) + (2*3^0) = 9 + 3 + 2 = 14
// Como el numero 12 al representarlo en base 3, no tiene ningun 2, es un numero valido. En cambio, el numero 14,
// tiene un dos en su base por lo que no es valido. El programa mostrara la secuencia de numeros que no contengan un 2
// en su base, en el clearIntervalo introducido por pantalla
//
// ---------------------------------------------------------------------------------------------------------------------

function constructor(size) {
    tablero.size = size;
    for (let i = 0; i < size; i++) {
        tablero.fila[i] = []
        for (let j = 0; j < size; j++) {
            tablero.fila[i][j] = ".";
        }

        tablero.reinasEnFila[i] = false;
        tablero.reinasEnColumna[i] = false;
    }
}

function imprimirTablero() {
    for (let i = 0; i < tablero.fila.length; i++) {
        let cadena = "";

        for (let j = 0; j < tablero.fila[i].length; j++) {
            cadena += " " + tablero.fila[i][j];
        }
        console.log(cadena);
    }
    console.log();
}

function comprobarDiagonalNormal(fila, columna) {
    let ejeX = fila;
    let ejeY = columna;

    // Recorremos la diagonal del primer cuadrante respecto a la posicion (todo positivo, 1º cuadrante)
    while (ejeX >= 0 && ejeY < tablero.fila.length) {
        if (tablero.fila[ejeX][ejeY] === '&') {
            return false;
        }

        ejeX--;
        ejeY++;
    }

    // Recorremos la diagonal del segundo cuadrante respecto a la posicion (ejeX negativo y ejeY positivo, 2º cuadrante)
    ejeX = fila;
    ejeY = columna;
    while (ejeX >= 0 && ejeY >= 0) {
        if (tablero.fila[ejeX][ejeY] === '&') {
            return false;
        }

        ejeX--;
        ejeY--;
    }

    // Recorremos la diagonal del tercer cuadrante respecto a la posicion (ejeX negativo y ejeY negativo, 3º cuadrante)
    ejeX = fila;
    ejeY = columna;
    while (ejeX < tablero.fila.length && ejeY >= 0) {
        if (tablero.fila[ejeX][ejeY] === '&') {
            return false;
        }

        ejeX++;
        ejeY--;
    }

    // Recorremos la diagonal del cuarto cuadrante respecto a la posicion (ejeX positivo y ejeY positivo, 4º cuadrante)
    ejeX = fila;
    ejeY = columna;
    while (ejeX < tablero.fila.length && ejeY < tablero.fila.length) {
        if (tablero.fila[ejeX][ejeY] === '&') {
            return false;
        }

        ejeX++;
        ejeY++;
    }

    return true;
}

function insertarReina(fila, columna) {
    console.log("Fila: " + fila + " - Columna: " + columna);
    if (fila < tablero.size && columna < tablero.size) {
        if (tablero.reinasAlmacenadas < tablero.size) {
            if (comprobarFila(fila)) {
                if (comprobarColumna(columna)) {
                    if (comprobarDiagonalNormal(fila, columna)) {
                        let nuevaReina = reina;
                        nuevaReina.fila = fila;
                        nuevaReina.columna = columna;
                    
                        tablero.fila[fila][columna] = "&";
                        tablero.reinasEnFila[fila] = true;
                        tablero.reinasEnColumna[columna] = true;
                        tablero.reinasAlmacenadas++;

                        insertarReina(fila + 1, 0);
                    }
                    else {
                        console.log("Diagonal no valida");
                        if (columna <= tablero.size) {
                            insertarReina(fila, columna + 1);
                        }
                        else {
                            insertarReina(fila + 1, 0);
                        }
                    }
                }
                else {
                    console.log("Columna no valida");
                    if (columna <= tablero.size) {
                        insertarReina(fila, columna + 1);
                    }
                    else {
                        insertarReina(fila + 1, 0);
                    }
                }
            }
            else {
                console.log("Fila no valida");
                if (fila <= tablero.size) {
                    insertarReina(fila + 1, columna);
                }
                else {
                    insertarReina(0, columna + 1);
                }
            }
        }
    }
}

function comprobarFila(fila) {
    if (tablero.reinasEnFila[fila] === true) {
        return false;
    }

    return true;
}

function comprobarColumna(columna) {
    if (tablero.reinasEnColumna[columna] === true) {
        return false;
    }

    return true;
}

let tablero = new Object();
tablero.size;
tablero.fila = [];
tablero.reinasEnFila = [];
tablero.reinasEnColumna = [];
tablero.reinasAlmacenadas = 0;

let reina = new Object();
reina.fila;
reina.columna;

constructor(8);
imprimirTablero();
insertarReina(0, 0);
imprimirTablero();
// insertarReina(0, 0);
//imprimirTablero();