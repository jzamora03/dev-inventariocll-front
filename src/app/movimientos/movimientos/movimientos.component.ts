import { Component,OnInit, ViewChild  } from '@angular/core';
import { MovimientosService } from '../services/movimientos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-movimientos',
  standalone: false,
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.scss'
})
export class MovimientosComponent implements OnInit {
  displayedColumns: string[] = ['producto', 'tipo', 'cantidad', 'fecha'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private movimientosService: MovimientosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get('id');
    if (productoId) {
      this.movimientosService.obtenerMovimientosPorProducto(+productoId).subscribe({
        next: data => {
          this.dataSource.data = data;
  
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        },
        error: err => {
          console.error('Error:', err);
        }
      });
    }
  }

  aplicarFiltro(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  volver(): void {
    this.router.navigate(['/inventario']);
  }
}