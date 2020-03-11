/** ---------------------------------------------------------------------------------------------------------------------
 *
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programacion de Aplicaciones Interactivas (PAI)
 * Curso: 3º Itinerario 1
 * Práctica 4 PAI - Problema de las 8 Reinas
 * Autor: Christian Torres Gonzalez
 * Correo: alu0101137902@ull.edu.es
 * Fecha: 8/03/2020
 *
 * Programa que muestra por pantalla las diferentes combinaciones en que se pueden
 * colocar 8 reinas en un tablero de ajedrez sin que se amenacen ademas comprobando
 * si no pertenecen a la recta formada por dos reinas ya introducidas
 *
 * ---------------------------------------------------------------------------------------------------------------------*/

/**
 * @param  {} size, tamaño del tablero
 * @description funcion utilizada para inicializar la matriz del tablero junto a sus
 * correspondientes atributos
 */
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

/**
 * @description Funcion utilizada para imprimi el tablero junto a las reinas que ha sido colocadas
 */
function imprimirTablero() {
  for (let i = 0; i < tablero.size; i++) {
    let cadena = "";

    for (let j = 0; j < tablero.fila[i].length; j++) {
      cadena += " " + tablero.fila[i][j];
    }
    console.log(cadena);
  }
  console.log();
}

/**
 * @param  {} columna, columna en la que queremos insertar la nueva reina.
 * @description, En esta funcion se ejecuta de manera recursiva, la llamada a insertarReina(),
 * donde se van insertando las reinas en aquellas posiciones validas. Empleando recursividad 
 * para generar todas las combinaciones posibles
 */
function insertarReina(columna) {
  if (tablero.reinasAlmacenadas.length === tablero.size) {
    imprimirTablero();
  }
  else {
    for (let fila = 0; fila < tablero.fila.length; fila++) {
      if (comprobarFila(fila) && comprobarColumna(columna) && comprobarDiagonalNormal(fila, columna) && comprobarLinea(fila, columna)) {
        crearReina(fila, columna);
        insertarReina(columna + 1);
        eliminarReina();
      }
    }
  }
}

/**
 * @param  {} fila, coordenada en el eje X en la que se va a insertar la reina
 * @param  {} columna, coordenada en el eje Y en la que se va a insertar la reina
 * @description, En esta funcion, su principal finalidad, es la de crear un nuevo
 * objeto de tipo reina que insertaremos en las coordenadas que se le pasa como
 * argumentos, ya que han sido comprobadas previamente y son validas
 */
function crearReina(fila, columna) {
  let nuevaReina = {fila: fila, columna: columna};
  nuevaReina.fila = fila;
  nuevaReina.columna = columna;

  tablero.fila[fila][columna] = "&";
  tablero.reinasEnFila[fila] = true;
  tablero.reinasEnColumna[columna] = true;
  tablero.reinasAlmacenadas.push(nuevaReina);
}

/**
 * @description, Necesitamos de esta implementacion debido a que cuando vuelva a atras
 * en la recursividad, el motivo de esa vuelta atras es porque si colocamos esa reina en esa
 * casilla, implica que ya no podemos colocar mas reinas, por lo que esa reina no va en esa
 * casilla, por lo que procedemos a eliminarla, para poder colocarla en otra que si nos de
 * una solucion correcta
 */
function eliminarReina() {
  let ejeX = tablero.reinasAlmacenadas[tablero.reinasAlmacenadas.length - 1].fila;
  let ejeY = tablero.reinasAlmacenadas[tablero.reinasAlmacenadas.length - 1].columna;

  tablero.reinasEnFila[ejeX] = false;
  tablero.reinasEnColumna[ejeY] = false;
  tablero.fila[ejeX][ejeY] = ".";
  tablero.reinasAlmacenadas.pop();
    
}

/**
 * @param  {} fila, coordenada en el eje X, de la reina que queremos introducir en la posicion dada
 * @param  {} columna, coordenada en el eje Y, de la reina que queremos introducir en la posicion dada
 * @description, Funcion utilizada para generar todas las combinaciones posibles de rectas que se pueden
 * generar con las reinas ya introducidas en el tablero
 */
function comprobarLinea(fila, columna) {
  if (tablero.reinasAlmacenadas.length < 2) {
    return true;
  }
  else {
    for (let reinaPrimera = 0; reinaPrimera < tablero.reinasAlmacenadas.length; reinaPrimera++) {
      for (let reinaSegunda = reinaPrimera + 1; reinaSegunda < tablero.reinasAlmacenadas.length; reinaSegunda++) {
        if (isPointInLine(fila, columna, lineFromTo(tablero.reinasAlmacenadas[reinaPrimera],
          tablero.reinasAlmacenadas[reinaSegunda]))) {
            return false;
        }
      }
    }
  }

  return true;
}

/**
 * @param  {} fila, coordena en el eje X, perteneciente a la reina que queremos colocar
 * @param  {} columna, coordena en el eje Y, perteneciente a la reina que queremos colocar
 * @param  {} linea, line formada por dos reinas dadas que utilizaremos para comprobar
 * @description, Funcion usada para comprobar si un punto dado pertenece a la recta
 * formada por dos reinas
 */
function isPointInLine(fila, columna, linea) {
  return (((linea.pendiente * fila) + linea.desplazamiento) - columna) === 0;
}

/**
 * @param  {} reinaPrimera, parametro uno, usado como primer punto que utilizaremos para
 * trazar la recta entre los dos puntos
 * @param  {} reinaSegunda, parametro dos, usado como segundo punto que utilizaremos para
 * trazar la recta entre los dos puntos
 * @description, Funcion utilizada para obtener los parametros que se utilizan para comprobar
 * si un punto dado pertenece a la recta que forman dos reinas
 */
function lineFromTo(reinaPrimera, reinaSegunda) {
  let pendiente_ = ((reinaSegunda.columna - reinaPrimera.columna) / (reinaSegunda.fila - reinaPrimera.fila));
  let desplazamiento_ = reinaPrimera.columna + pendiente_ * reinaPrimera.fila;

  return {pendiente: pendiente_, desplazamiento: desplazamiento_};
}

/**
 * @param  {} fila, comprobamos que la fila en la que queremos insertar la reina es valida
 * y no hay otra reian en ese misma fila pero en otra columna que amenace a la reina
 * @description, comprobamos si en la fila que queremos tratar, ya se encuentra una reina
 * insertada o no. Por ello simplemente comprobamos si en tablero.reinasEnFila[fila] hay un true
 * @returns, En caso de encontrar que en esa fila, ya se encuentra una reina insertada, retornamos
 * false ya que la fila queda invalidada. En caso contrario, la fila es valida y retornamos true
 */
function comprobarFila(fila) {
  if (tablero.reinasEnFila[fila] === true) {
    return false;
  }

  return true;
}

/**
 * @param  {} columna, comprobamos que la columna en la que queremos insertar la reina es valida
 * y no hay otra reian en ese misma columna pero en otra fila que amenace a la reina
 * @description, comprobamos si en la columna que queremos tratar, ya se encuentra una reina
 * insertada o no. Por ello simplemente comprobamos si en tablero.reinasEnColumna[columna] hay un true
 * @returns, En caso de encontrar que en esa columna, ya se encuentra una reina insertada, retornamos
 * false ya que la columna queda invalidada. En caso contrario, la fila es valida y retornamos true
 */
function comprobarColumna(columna) {
  if (tablero.reinasEnColumna[columna] === true) {
    return false;
  }

  return true;
}

/**
 * @param  {} fila, coordenada respecto al eje X, que queremos comprobar si esta o no en la diagonal
 * de alguna reina para que no la amenace
 * @param  {} columna, coordenada respecto al eje X, que queremos comprobar si esta o no en la diagonal
 * de alguna reina para que no la amenace
 * @returns {boolean} Una vez comprobada la posicion, en caso de que pertenezca a una diagonal, se retornaria
 * que esa posicion no es valida, por lo que se retorna false. En caso de si ser valida, se retorna true
 */
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

let tablero = new Object();
tablero.size;
tablero.fila = [];
tablero.reinasEnFila = [];
tablero.reinasEnColumna = [];
tablero.reinasAlmacenadas = [];

constructor(8);
imprimirTablero();
insertarReina(0);