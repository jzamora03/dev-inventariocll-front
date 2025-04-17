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

  alertaVisible: boolean = false;
  alertaMensaje: string = '';
  alertaTipo: 'success' | 'danger' | 'warning' = 'success';

  productoEditar = { id: 0, nombre: '', cantidad: 0 };

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

  eliminarProducto(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }
  
    this.inventarioService.eliminarProducto(id).subscribe({
      next: (res) => {
       // alert('Producto eliminado correctamente.');
        this.mostrarAlerta('Producto eliminado correctamente.', 'success');
        this.refrescarLista();
      },
      error: (err) => { 
        this.mostrarAlerta((err.error?.mensaje), 'danger');
       //alert('Error al eliminar: ' + (err.error?.mensaje));
       
      }
    });
  }
  
  refrescarLista(): void {
    this.inventarioService.obtenerProductos().subscribe(productos => {
      const ordenados = [...productos].sort((a, b) => a.id - b.id);
      this.dataSource.data = ordenados;
      this.productosTotales = ordenados.length;
      this.productosBajoStock = ordenados.filter(p => p.cantidad < 10).length;
      this.ultimoProducto = ordenados.length ? ordenados[ordenados.length - 1].nombre : '-';
    });
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'danger' | 'warning' = 'success'): void {
    this.alertaMensaje = mensaje;
    this.alertaTipo = tipo;
    this.alertaVisible = true;
  
    setTimeout(() => {
      this.alertaVisible = false;
    }, 4000);
  }
  
  cerrarAlerta(): void {
    this.alertaVisible = false;
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

  nuevoProducto = {
    nombre: '',
    cantidad: 0
  };

  abrirModalNuevoProducto(): void {
    this.nuevoProducto = { nombre: '', cantidad: 0 };
    bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoProducto')).show();
  }

  registrarNuevoProducto(): void {
    this.inventarioService.agregarProducto(this.nuevoProducto).subscribe({
      next: () => {
        bootstrap.Modal.getInstance(document.getElementById('modalNuevoProducto'))?.hide();
        this.ngOnInit();
      },
      error: err => {
        alert((err.error?.mensaje || 'Error al registrar producto.'));
      }
    });
  }

  abrirModalEditar(producto: any): void {
    this.productoEditar = { ...producto };
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalEditarProducto'));
    modal.show();
  }
  
  actualizarProducto(): void {
    this.inventarioService.actualizarProducto(this.productoEditar).subscribe({
      next: res => {
        this.mostrarAlerta('Producto actualizado correctamente', 'success');
        bootstrap.Modal.getInstance(document.getElementById('modalEditarProducto')).hide();
        this.refrescarLista();
      },
      error: err => {
        this.mostrarAlerta((err.error?.mensaje), 'danger');
      }
    });
  }

  @ViewChild('registroMovimiento') registroMovimientoComponent!: RegistroMovimientoComponent;

  abrirModalMovimiento(producto: any): void {
    this.registroMovimientoComponent.producto = producto;
    this.registroMovimientoComponent.abrir();
  }
  
}
