import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroMovimientoComponent } from './registro-movimiento/registro-movimiento.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { MovimientosRoutingModule } from './movimientos-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    RegistroMovimientoComponent,
    MovimientosComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class MovimientosModule { }
