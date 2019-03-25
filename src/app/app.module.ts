import { ImagenPipe } from './../pipes/imagen/imagen';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { 
  BusquedaPage,
  CarritoPage, 
  CategoriasPage, 
  HomePage, 
  LoginPage, 
  OrdenesDetallePage, 
  OrdenesPage, 
  PorCategoriasPage, 
  ProductoPage, 
  TabsPage 
} from '../pages/index.paginas';

import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuarioProvider } from '../providers/usuario/usuario';

ImagenPipe

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    CarritoPage, 
    CategoriasPage, 
    HomePage, 
    LoginPage, 
    OrdenesDetallePage, 
    OrdenesPage, 
    PorCategoriasPage, 
    ProductoPage, 
    TabsPage,
    BusquedaPage 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarritoPage, 
    CategoriasPage, 
    HomePage, 
    LoginPage, 
    OrdenesDetallePage, 
    OrdenesPage, 
    PorCategoriasPage, 
    ProductoPage, 
    TabsPage,
    BusquedaPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule { }
