import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: 'login',pathMatch: 'full'},
  { path: 'inventario', loadChildren: () => import('./inventario/inventario.module').then(m => m.InventarioModule) },
  { path: 'movimientos', loadChildren: () => import('./movimientos/movimientos.module').then(m => m.MovimientosModule) },
  { path: 'movimientos/:id', loadChildren: () =>import('./movimientos/movimientos.module').then(m => m.MovimientosModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
