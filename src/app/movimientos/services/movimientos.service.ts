import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private baseUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) {}

  obtenerMovimientosPorProducto(id: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/historial-movimientos-producto/${id}`, { headers });
  }

  registrarMovimiento(dto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/registrar-movimiento-producto`, dto, { headers });
  }
}
