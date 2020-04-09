/**
  * @copyright Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Asignatura: Programación de Aplicaciones Interactivas (PAI)
  * Curso: 3º Itinerario 1
  * Práctica 7 PAI - Mandelbrot. Numero complejos
  * @author: Christian Torres Gonzalez alu0101137902@ull.edu.es
  * @description: Programa que dado un lienzo de canvas, va a calcular, dada
  * una coordenada X e Y, que dada un numro de iteraciones, para cada coordenada,
  * y utilizando la función f(Zn) = Z(n-1)^2 + c, donde c es un numero complejo dado,
  * y zn-1 es el resultado de elevar al cuadrado la funcion para valor Zn-1. Para poder
  * llegar a un resultado deseado, debemos partir de la copndicion de que x e y, que son
  * las coordenadas del punto del lienzo de canvas que estamos tratando.
  * @since 28/03/2020
  * @file Fichero de implementacion de ejercicios
  * @version 1.0.0
*/

'use strict'

class numeroComplejo {
  /**
  * @description Constructor de la clase numero complejo
  * @param {Number} x Parte real del complejo
  * @param {Number} y Parte imaginaria del complejo
  * @returns En esta funcion, no retornamos nada, ya que simplemente se encarga de construir
  * el complejo.
  */
  constructor(x, y) {
    this.parteReal = x;
    this.parteImaginaria = y;
  }

  /**
  * @description Funcion getter para devolver la parte real del numero complejo
  * @params
  * @returns En esta funcion, retornamos la parte real del complejo en cuestion
  */
  getParteReal() {
    return this.parteReal;
  }

  /**
  * @description Funcion getter para devolver la parte imaginaria del numero complejo
  * @param {}
  * @returns En esta funcion, retornamos la parte imaginaria del complejo en cuestion
  */
  getParteImaginaria() {
    return this.parteImaginaria;
  }

  /**
  * @description Funcion setter para introducir la parte real del numero complejo
  * @param {}
  * @returns En esta funcion, no retornamos nada, ya que se encarga de almacenar
  */
  setParteReal(valor) {
    this.parteReal = valor;
  }

  /**
  * @description Funcion setter para introducir la parte imaginaria del numero complejo
  * @param {}
  * @returns En esta funcion, no retornamos nada, ya que se encarga de almacenar
  */
  setParteImaginaria(valor) {
    this.parteImaginaria = valor;
  }

  /**
  * @description Funcion encargada de retornar el cuadrado de la parte real del
  * numero complejo, principalmente creada para funciones futuras
  * @param {}
  * @returns En esta funcion, retornamos el cuadrado de la parte real del numero
  * complejo
  */
  cuadradoParteReal() {
    if (this.parteReal === 0)
      return this.parteReal * this.parteReal;
    else {
      return 0;
    }
  }

  /**
  * @description Funcion encargada de retornar el cuadrado de la parte imaginaria del
  * numero complejo, principalmente creada para funciones futuras
  * @param {}
  * @returns En esta funcion, retornamos el cuadrado de la parte imaginaria del numero
  * complejo
  */
  cuadradoParteImaginaria() {
    return this.parteImaginaria * this.parteImaginaria;
  }

  /**
  * @description Funcion encargada de retornar parte del calculo utilizado en el codigo de
  * Mandelbrot, que calcula la parte real del nuervo numero complejo que utilizamos para
  * comprobar si ese numero complejo esta dentro del umbral permitido
  * @param {}
  * @returns En esta funcion, retornamos parte del calculo utilizado en el codigo de
  * Mandelbrot, para comprobar si ese numero complejo esta dentro del umbral permitido
  */
  calcularParteReal() {
    return (this.cuadradoParteReal() - this.cuadradoParteImaginaria());
  }

  /**
  * @description Funcion encargada de retornar parte del calculo utilizado en el codigo de
  * Mandelbrot, que calcula la parte imaginaria del nuervo numero complejo que utilizamos para
  * comprobar si ese numero complejo esta dentro del umbral permitido
  * @param {}
  * @returns En esta funcion, retornamos parte del calculo utilizado en el codigo de
  * Mandelbrot, para comprobar si ese numero complejo esta dentro del umbral permitido
  */
  calcularParteImaginaria() {
    return (2 * this.parteReal * this.parteImaginaria);
  }

  /**
  * @description Funcion encargada de comprobar si el complejo que hemos calculado
  * previamente en la funcion calcularFdeZ, en el codigo de Mandelbrot, esta por 
  * encima de 2, lo que significa que ese  numero no pertenece
  * @param {}
  * @returns En esta funcion, retornamos parte del calculo utilizado en el codigo de
  * Mandelbrot, para comprobar si ese numero complejo esta dentro del umbral permitido
  */
  mayorQueDos() {
    return ((this.parteReal * this.parteImaginaria) > 2 ) ? true : false;
  }

  mayorQueTres() {
    return ((this.parteReal * this.parteImaginaria) > 2 ) ? true : false;
  }

  mayorQueCuatro() {
    return ((this.parteReal * this.parteImaginaria) > 2 ) ? true : false;
  }

  mayorQueCinco() {
    return ((this.parteReal * this.parteImaginaria) > 2 ) ? true : false;
  }
}

module.exports = {numeroComplejo: numeroComplejo};