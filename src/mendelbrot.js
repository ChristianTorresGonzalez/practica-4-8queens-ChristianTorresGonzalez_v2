// /**
//   * @copyright Universidad de La Laguna
//   * Escuela Superior de Ingeniería y Tecnología
//   * Grado en Ingeniería Informática
//   * Asignatura: Programación de Aplicaciones Interactivas (PAI)
//   * Curso: 3º Itinerario 1
//   * Práctica 7 PAI - Mandelbrot. Numero complejos
//   * @author: Christian Torres Gonzalez alu0101137902@ull.edu.es
//   * @description: Programa que dado un lienzo de canvas, va a calcular, dada
//   * una coordenada X e Y, que dada un numro de iteraciones, para cada coordenada,
//   * y utilizando la función f(Zn) = Z(n-1)^2 + c, donde c es un numero complejo dado,
//   * y zn-1 es el resultado de elevar al cuadrado la funcion para valor Zn-1. Para poder
//   * llegar a un resultado deseado, debemos partir de la copndicion de que x e y, que son
//   * las coordenadas del punto del lienzo de canvas que estamos tratando.
//   * @since 28/03/2020
//   * @file Fichero de implementacion de ejercicios
//   * @version 1.0.0
// */

'use strict'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/**
 * @description En esta funcion, almacenamos el numero introducido en el navegador
 * que hace referencia a la cnatidad de puntos que queremos usar para calcular
 * el área
 * @param  {} 
 * @returns En esta funcion no retornamos nada, ya que el resultado es almacenado directamente
 */
function numeroDePuntos() {
  puntos = prompt("Introduzca numero de puntos a usar:");
}

/**
 * @description Funcion utilizada para calcular el area que encierra a todos los puntos
 * pertenecientes al Mandelbrot junto a su error. Para ello, tras introducir la cantidad de 
 * puntos que desea usar el usuario, utilizando el boton indicado, se procede a generar esa 
 * cantidad de puntos para comprobar si cumplen la funcion de umbral. En funcion de la cantidad
 * de puntos que introduzca el usuario, se obtendra un tamalo de área u otro.
 * Para calcualar dicho área, se utiliza la siguiente formula:
 *  - Área = 2 * 2.5 * 1.125 * (numeroPuntosPertenecientesAlÁrea) / cnatidadTotalDePuntos
 *  - Error = area / sqrt(cnatidadTotalDePuntos)
 * @param  {} 
 * @returns En esta funcion no retornamos nada, ya que el resultado es almacenado directamente
 */
function calcularArea() {
  const MINIMOX = -2;
  const MAXIMOX = 0.5;
  const MINIMOY = 0;
  const MAXIMOY = 1.125;

  let puntoPertenecientesAlArea = 0;

  for (let i = 0; i < puntos; i++) {
    let coordenadaX = Math.random() * (MAXIMOX - MINIMOX) + MINIMOX;
    let coordenadaY = Math.random() * (MAXIMOY - MINIMOY) + MINIMOY;
    let complejo = new numeroComplejo(coordenadaX, coordenadaY);

    if (calcularFdeZ(complejo) === 0) {
      puntoPertenecientesAlArea++;
    }
  }

  let area = 2 * 2.5 * 1.125 * puntoPertenecientesAlArea / puntos;
  let error = area / Math.sqrt(puntos);
  
  alert("Area: " + area);
  alert("Error: "  + error);
}

/**
 * @description Funcion que utilizamos para, dado un numero complejo, y un numero de iteraciones
 * maximo, calcular si ese complejo llegado un punto, comprobar si la distancia de ese punto es
 * mayor que 2, de tal manera que si la suma 
 * @param  {Number} complejoParteReal Parte real del numero complejo que queremos comprobar,
 * en este caso es la coordenada X del punto con el que estamos trabajando
 * @param  {Number} complejoParteImaginaria Parte imaginaria del numero complejo que queremos comprobar,
 * en este caso es la coordenada Y del punto con el que estamos trabajando
 */
function calcularFdeZ(complejo) {
  const MAXIMOITERACIONES = 10000;
  let complejoAuxiliar = complejo;
  let iteraciones = 0;

  while (iteraciones < MAXIMOITERACIONES) {
    let parteReal = complejoAuxiliar.calcularParteReal() + complejo.getParteReal();
    let parteImaginaria = complejoAuxiliar.calcularParteImaginaria() + complejo.getParteImaginaria();

    complejoAuxiliar = new numeroComplejo(parteReal, parteImaginaria);

    if (complejoAuxiliar.mayorQueDos())
      return (iteraciones);
    else {
      ctx.fillStyle = 'green';
      ctx.fillRect(parteReal, parteImaginaria, 1,1);
    }
    
    iteraciones++;
  }

  return 0;
}

/**
 * @description Funcion que utilizamos para, dado un canvas conn un tamaño especifico,
 * calculamos para cada coordenada X e Y, del canvas, cuales de esos puntos, pertenecen
 * a la region perteneciente al Mandelbrot, usando la funcion anterior donde calculamos si 
 * dicho punto, efectivamente pertenece al intervalo.
 * @params
 * @returns En esta funcion, no retornamos nada, ya que simplemente se encarga de seleccionar
 * el punto a tratar y pintar.
 */
function calcularMandelbrot() {
  let limiteInferiorEjeX = -2;
  let limiteSuperiorEjeX = 0.5;
  let limiteInferiorEjeY = -1;
  let limiteSuperiorEjeY = 1;

  for (let ejeX = 0; ejeX < canvas.width; ejeX++) {
    for (let ejeY = 0; ejeY < canvas.height; ejeY++) {
      let coordenadaX = (limiteInferiorEjeX + (ejeX / canvas.width) *
        (limiteSuperiorEjeX - limiteInferiorEjeX));
      let coordenadaY = (limiteInferiorEjeY +
        (ejeY / canvas.height) * (limiteSuperiorEjeY - limiteInferiorEjeY));
      
      let complejo = new numeroComplejo(coordenadaX, coordenadaY);
      let iteraciones = calcularFdeZ(complejo);
      
      if(iteraciones !== 0) {
        ctx.fillStyle = 'hsl(0, 100%, ' + iteraciones + '%)';
        ctx.fillRect(ejeX, ejeY, 1,1);
      }
    }
  }
}

let puntos;
calcularMandelbrot();