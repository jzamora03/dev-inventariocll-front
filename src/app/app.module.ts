import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LoginComponent } from './auth/login/login.component';
import { ListaComponent } from './productos/lista/lista.component';
import { RegistroComponent } from './movimientos/registro/registro.component';
import { MovimientosModule } from './movimientos/movimientos.module';
import { ProductosModule } from './productos/productos.module';
import { AuthModule } from './auth/auth.module';
import { ListaProductosComponent } from './inventario/lista-productos/lista-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    ListaComponent,
    RegistroComponent,
    //ListaProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MovimientosModule,
    ProductosModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
