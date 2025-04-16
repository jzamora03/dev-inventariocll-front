import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../services/inventario.service';
import { Router } from '@angular/router';

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

  constructor(private inventarioService: InventarioService, private router: Router) {}

  ngOnInit(): void {
    this.inventarioService.obtenerProductos().subscribe(productos => {
      this.dataSource.data = productos;
      this.dataSource.paginator = this.paginator;
    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  verMovimientos(productoId: number) {
    this.router.navigate(['/movimientos', productoId]);
  }
}
