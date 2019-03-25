import { BusquedaPage } from './../busqueda/busqueda';
import { CategoriasPage, HomePage, OrdenesPage } from './../index.paginas';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = HomePage;
  tab2 = CategoriasPage;
  tab3 = OrdenesPage;
  tab4 = BusquedaPage;

}
