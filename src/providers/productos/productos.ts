import { URL_SERVICIOS } from './../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  productos: any[] = [];

  constructor(public http: HttpClient) {
    // Invocamos la Función de 'cargar_todos()' porque vamos a cargarla siempre:
    this.cargar_todos();
  }

  cargar_todos() {

    // Creamos una promesa para CONTROLAR el momento en el cual TERMINA de CARGAR los DATOS:
    let promesa = new Promise((resolve, reject) => {
      // Cargamos la URL fija de los servicios
      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;

      this.http.get(url)
        .subscribe((data: any) => {
          // console.log(data);
          if (data.error) {
            // console.error(data.error);
          } else {
            let nuevaData = this.agrupar(data.lineas, 2);
            // Añadimos cada elemento del Array de la propiedad 'data.lineas' de la respuesta en el Array 'this.productos':
            this.productos.push(...nuevaData);
            // Avanzamos una página para cargar la siguiente página cuando se vuelva a llamar al método:
            this.pagina += 1;
          }
          resolve();
        });
    });

    return promesa;
  }

  // Descomponemos un Array (arr) de una Dimensión en un Array de un Número de Dimensiones dado (tamano):
  private agrupar(arr: any, tamano: number) {

    let nuevoArreglo = [];
    for (let i = 0; i < arr.length; i += tamano) {
      nuevoArreglo.push(arr.slice(i, i + tamano));
    }
    console.log(nuevoArreglo);

    return nuevoArreglo;
  }

}
