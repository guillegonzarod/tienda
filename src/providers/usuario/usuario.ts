import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioProvider {

  token: string;
  id_usuario: string;

  constructor(public http: HttpClient, private alertCtrl: AlertController) {

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
        }
      });
  }

}
