import { URL_SERVICIOS } from './../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { UsuarioProvider } from './../usuario/usuario';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CarritoPage, LoginPage } from '../../pages/index.paginas';

@Injectable()
export class CarritoProvider {

  items: any[] = [];
  total_carrito:number = 0;

  constructor(private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage,
    private modalCtrl: ModalController,
    private _us: UsuarioProvider,
    private http: HttpClient) {
    this.cargar_storage();
    this.actualizar_total();
  }

  remove_item( idx:number ){

    this.items.splice(idx,1);
    this.guardar_storage();

  }

  realizar_pedido(){

    let codigos:string[]=[];

    for( let item of this.items ){
      codigos.push( item.codigo );
    }

        // Añadimos las cabeceras (Headers) de la petición POST:
        var header = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        // Añadimos el Objeto JSON que queremos enviar al servicio Rest:
        let body = JSON.stringify({
          "items": codigos.join(","),
        });
    
    let url = `${ URL_SERVICIOS }/pedidos/realizar_orden/${ this._us.token }/${ this._us.id_usuario }`;

    this.http.post( url, body, header )
             .subscribe( (resp: any)  =>{

               if( resp.error ){
                 // mostramos error
                 this.alertCtrl.create({
                   title: "Error en la orden",
                   subTitle: resp.mensaje,
                   buttons: ["OK"]
                 }).present();

               }else{
                 // todo bien!
                this.items = [];
                this.alertCtrl.create({
                  title: "Orden realizada!",
                  subTitle: "Nos contactaremos con usted próximamente",
                  buttons: ["OK"]
                }).present();
               }
          })
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
    this.actualizar_total();
    this.guardar_storage();
  }

  actualizar_total(){

    this.total_carrito = 0;
    for( let item of this.items ){
      this.total_carrito += Number( item.precio_compra );
    }

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
