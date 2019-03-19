import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoPage } from '../index.paginas';
import { ProductosProvider } from '../../providers/index.services';

@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  productoPage = ProductoPage;

  categoria:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private _ps: ProductosProvider ) {
    console.log(this.navParams.get("categoria"));
    this.categoria = this.navParams.get("categoria");
    this._ps.cargar_por_categoria( this.categoria.id );
  }
}
