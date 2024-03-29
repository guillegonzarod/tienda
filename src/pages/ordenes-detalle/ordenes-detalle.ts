import { CarritoProvider } from './../../providers/carrito/carrito';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {


  orden: any = {}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _cs: CarritoProvider) {

    this.orden = this.navParams.get("orden");

  }

  borrar_orden( orden_id:string ){

    this._cs.borrar_orden(orden_id)
            .subscribe( (data: any) =>{

              if( data.error ){
                // manejo de errores
              }else{
                this.navCtrl.pop();
              }
        })


  }
}
