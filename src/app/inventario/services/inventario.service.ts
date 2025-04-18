import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  //private apiUrl = 'http://localhost:5000/productos';

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/productos/obtener-productos`, { headers });
  }

  agregarProducto(producto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/productos/agrear-nuevo-producto`, producto, { headers });
  }

  eliminarProducto(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/productos/eliminar-prodcuto/${id}`, { headers });
  }

  actualizarProducto(producto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.put(`${this.baseUrl}/productos/actualizar-producto`, producto, { headers });
  }
}