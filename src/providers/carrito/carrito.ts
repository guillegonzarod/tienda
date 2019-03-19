import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage) {
    this.cargar_storage();
  }

  agregar_carrito(item_parametro: any) {

    for (let item of this.items) {
      if (item.codigo == item_parametro.codigo) {

        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_parametro.producto + ", ya se encuentra en su carrito de compras",
          buttons: ["OK"]
        }).present();

        return;
      }
    }

    this.items.push(item_parametro);
    this.guardar_storage();
  }

  private guardar_storage() {

    if (this.platform.is("cordova")) {
      // dispositivo
      this.storage.set('items', this.items);

    } else {
      // computadora
      localStorage.setItem("items", JSON.stringify(this.items));

    }
  }

  cargar_storage() {

    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is("cordova")) {
        // dispositivo
        this.storage.ready()
          .then(() => {

            this.storage.get("items")
              .then(items => {
                if (items) {
                  this.items = items;
                }
                resolve();
              })

          })
      } else {
        // computadora
        if (localStorage.getItem("items")) {
          //Existe items en el localstorage
          this.items = JSON.parse(localStorage.getItem("items"));
        }

        resolve();

      }

    });

    return promesa;

  }

}
