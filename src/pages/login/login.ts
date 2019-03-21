import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string = "";
  contrasena:string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _us: UsuarioProvider,
    public viewCtrl: ViewController) {
    
  }

  ingresar(){
    this._us.ingresar(this.correo, this.contrasena).subscribe(()=>{
      if( this._us.activo() ){
        this.viewCtrl.dismiss(true);
      }
    });
  }

}
