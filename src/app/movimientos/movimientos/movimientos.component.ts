import { Component,OnInit, ViewChild  } from '@angular/core';
import { MovimientosService } from '../services/movimientos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private movimientosService: MovimientosService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get('id');
    if (productoId) {
      this.movimientosService.obtenerMovimientosPorProducto(+productoId).subscribe({
        next: data => {
          this.dataSource.data = data;
        },
        error: err => {
          console.error('Error:', err);
        }
      });
    }

  }
}