import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../services/inventario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { RegistroMovimientoComponent } from '../../movimientos/registro-movimiento/registro-movimiento.component';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-productos',
  standalone: false,
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  columnas: string[] = ['nombre', 'cantidad', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private inventarioService: InventarioService, private router: Router, private authService: AuthService) {}

  productos: any[] = [];

  productosTotales: number = 0;
  productosBajoStock: number = 0;
  ultimoProducto: string = '-';


  ngOnInit(): void {
    this.inventarioService.obtenerProductos().subscribe(productos => {
      const ordenadosPorIdAsc = [...productos].sort((a, b) => a.id - b.id);
  
      this.dataSource = new MatTableDataSource(ordenadosPorIdAsc);
      this.dataSource.paginator = this.paginator;
  
      this.productosTotales = ordenadosPorIdAsc.length;
      this.productosBajoStock = ordenadosPorIdAsc.filter(p => p.cantidad < 10).length;
  
      const ultimo = [...ordenadosPorIdAsc].sort((a, b) => b.id - a.id)[0];
      this.ultimoProducto = ultimo ? ultimo.nombre : '-';
    });
  }
  
  
  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  verMovimientos(productoId: number) {
    this.router.navigate(['/movimientos', productoId]);
  }

  abrir(): void {
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById('modalMovimiento')
    );
    modal.show();
  }

  /*******Logica modal*********/ 

  @ViewChild('registroMovimiento') registroMovimientoComponent!: RegistroMovimientoComponent;

  abrirModalMovimiento(producto: any): void {
    this.registroMovimientoComponent.producto = producto;
    this.registroMovimientoComponent.abrir();
  }
  
}
