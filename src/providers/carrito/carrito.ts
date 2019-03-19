import { UsuarioProvider } from './../usuario/usuario';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CarritoPage, LoginPage } from '../../pages/index.paginas';

@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage,
    private modalCtrl: ModalController,
    private _us: UsuarioProvider) {
    this.cargar_storage();
  }

  ver_carrito(){

    let modal:any;

    // Si el 'Token' existe mostramos la Página del 'Carrito':
    if( this._us.token ){
      //mostrar pagina del carrito
      modal = this.modalCtrl.create( CarritoPage );

    }
    // Si el 'Token' NO existe mostramos la Página del 'Login':
    else{
      // mostrar el login
      modal = this.modalCtrl.create( LoginPage );
    }

    modal.present();

    // Si Cancelamos la Página Modal y YA estamos AUTENTICADOS debe mostramos la Página del 'Carrito':
    modal.onDidDismiss(  (abrirCarrito:boolean)=>{

      console.log(abrirCarrito);

      if( abrirCarrito ){
        this.modalCtrl.create( CarritoPage ).present();
      }

    })
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
