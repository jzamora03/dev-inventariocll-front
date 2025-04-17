import { Component, Input  } from '@angular/core';
import { MovimientosService  } from '../services/movimientos.service';

declare const bootstrap: any;


@Component({
  selector: 'app-registro-movimiento',
  standalone: false,
  templateUrl: './registro-movimiento.component.html',
  styleUrl: './registro-movimiento.component.scss'
})
export class RegistroMovimientoComponent {
  @Input() producto: any;
  cantidad: number = 0;

  constructor(private MovimientosService : MovimientosService ) {}

  abrir(): void {
    this.cantidad = 0;
    bootstrap.Modal.getOrCreateInstance(document.getElementById('modalMovimiento')).show();
  }

  registrar(): void {
    const dto = {
      productoId: this.producto.id,
      cantidad: this.cantidad
    };

    this.MovimientosService.registrarMovimiento(dto).subscribe({
      next: (res) => {
        alert('Movimiento registrado exitosamente');
        bootstrap.Modal.getInstance(document.getElementById('modalMovimiento')).hide();
        window.location.reload(); 
      },
      error: (err) => {
        alert('' + (err.error?.mensaje || 'Error al registrar.'));
      }
    });
  }
}
