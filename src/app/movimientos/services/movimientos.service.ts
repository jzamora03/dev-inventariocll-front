import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MovimientosService {
  private apiUrl = 'http://localhost:5000/movimientos';

  constructor(private http: HttpClient) {}

  obtenerMovimientosPorProducto(id: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/historial-movimientos-producto/${id}`, { headers });
  }

  registrarMovimiento(dto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/registrar-movimiento-producto`, dto, { headers });
  }
}