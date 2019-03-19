import { CarritoProvider } from './../../providers/carrito/carrito';
import { ProductoPage } from './../producto/producto';
import { ProductosProvider } from './../../providers/productos/productos';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage: any = ProductoPage; 

  constructor(public navCtrl: NavController, private _ps: ProductosProvider, private _cs: CarritoProvider) {

  }

  siguiente_pagina(infiniteScroll) {
    this._ps.cargar_todos().then(() => {
      // Cada vez que se invoca la función 'complete()' vuelve a llamar a la función 'cargar_todos()':
      infiniteScroll.complete();
    });
  }

}
