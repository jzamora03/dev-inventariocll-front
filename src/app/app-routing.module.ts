import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: 'login',pathMatch: 'full'},
  { path: 'inventario', loadChildren: () => import('./inventario/inventario.module').then(m => m.InventarioModule), canActivate: [AuthGuard] },
  { path: 'movimientos', loadChildren: () => import('./movimientos/movimientos.module').then(m => m.MovimientosModule), canActivate: [AuthGuard] },
  { path: 'movimientos/:id', loadChildren: () =>import('./movimientos/movimientos.module').then(m => m.MovimientosModule), canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
