import { ProductoPage } from './../producto/producto';
import { ProductosProvider } from './../../providers/productos/productos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  productoPage = ProductoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _ps: ProductosProvider) {
  }

  buscar_productos(ev: any){

    let valor = ev.target.value;
    console.log(valor);

    this._ps.buscar_producto( valor );
  }

}
