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

function mobileMean(timeSerie, p) {
    let solucion = [];
    for (let i = 0; i <= timeSerie.length - p; i++) {
        let acumulador = 0;
        acumulador += timeSerie[i];
        for (let j = i + 1; j <= p; j++) {
            acumulador += timeSerie[j];
        }
        console.log(acumulador / p);
    }
    console.log(solucion);
}

mobileMean([5, 2, 2, 8, -4, -1, 2], 3);