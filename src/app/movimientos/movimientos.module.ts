import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroMovimientoComponent } from './registro-movimiento/registro-movimiento.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { MovimientosRoutingModule } from './movimientos-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    //RegistroMovimientoComponent,
    MovimientosComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    MaterialModule,
    FormsModule

  ]
})
export class MovimientosModule { }
