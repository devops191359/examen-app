import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductoReqModel } from "src/app/model/productos/producto-req.model";
import { ProductoModel } from "src/app/model/productos/producto.model";
import { environment } from "src/environments/environment";

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
    providedIn: 'root',
})
export class ProductoService {
    constructor(private http: HttpClient) { }
    
    getProductos(): Observable<any> {
        console.log('getProductos');
        return this.http.get(`${environment.apiUrl}/procesos/productos/busquedas`);
    }

    saveProduto(request:ProductoReqModel): Observable<any> {
        console.log('saveProducto');
        return this.http.post(`${environment.apiUrl}/procesos/productos`,request);
    }

    updateProducto(request:ProductoModel): Observable<any> {
        console.log('updateProducto');
        return this.http.put(`${environment.apiUrl}/procesos/productos`,request);
    }

    deleteProducto(idProducto:number): Observable<any> {
        console.log('deleteProducto');
        return this.http.delete(`${environment.apiUrl}/procesos/productos/bajas/`+idProducto);
    }
}
