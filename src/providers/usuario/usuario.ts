import { AlertController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {

  token: string;
  id_usuario: string;

  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage) {
    this.cargar_storage();
  }

  activo(): boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  ingresar(correo: string, contrasena: string) {

    let url = URL_SERVICIOS + "/login";

    // Añadimos las cabeceras (Headers) de la petición POST:
    var header = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Añadimos el Objeto JSON que queremos enviar al servicio Rest:
    let body = JSON.stringify({
      "correo": correo,
      "contrasena": contrasena
    });
    // Devolvemos un 'Observable' (utilizando la función map()) al que nos subscribiremos en el momento de invocar esta función:
    return this.http.post(url, body, header)
      .map((resp: any) => {
        console.log(resp);
        if (resp.error) {
          this.alertCtrl.create({
            title: "Error al iniciar",
            subTitle: resp.mensaje,
            buttons: ["OK"]
          }).present();
        } else {
          this.token = resp.token;
          this.id_usuario = resp.id_usuario;

          // Guardar Storage
          this.guardar_storage();
        }
      });
  }

  cerrar_sesion() {

    this.token = null;
    this.id_usuario = null;

    // guardar storage
    this.guardar_storage();
  }

  private guardar_storage() {

    if (this.platform.is("cordova")) {
      // dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);

    } else {
      // computadora
      if (this.token) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("id_usuario", this.id_usuario);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is("cordova")) {
        // dispositivo
        this.storage.ready()
          .then(() => {
            this.storage.get("token")
              .then(token => {
                if (token) {
                  this.token = token;
                }
              })
            this.storage.get("id_usuario")
              .then(id_usuario => {
                if (id_usuario) {
                  this.id_usuario = id_usuario;
                }
                resolve();
              })
          })
      } else {
        // computadora
        if (localStorage.getItem("token")) {
          //Existe items en el localstorage
          this.token = localStorage.getItem("token");
          this.id_usuario = localStorage.getItem("id_usuario");
        }
        resolve();
      }
    });
    return promesa;
  }

}
