import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CarritoProvider {

  items:any[] = [];

  constructor(private alertCtrl: AlertController) {
    
  }

  agregar_carrito( item_parametro:any ){

    for( let item of this.items ){
      if( item.codigo == item_parametro.codigo ){

        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_parametro.producto + ", ya se encuentra en su carrito de compras",
          buttons: ["OK"]
        }).present();

        return;
      }
    }

    this.items.push( item_parametro );
  }

}
