import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {

  token:string;
  id_usuario:string;

  constructor() {
    console.log('Hello UsuarioProvider Provider');
  }

}
