import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule } from './inventario-routing.module';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { MaterialModule } from '../shared/material/material.module';
import { RegistroMovimientoComponent } from '../movimientos/registro-movimiento/registro-movimiento.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaProductosComponent, RegistroMovimientoComponent],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MaterialModule,
    FormsModule

  ]
})
export class InventarioModule { }
