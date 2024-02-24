import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get(`${environment.BASE_URL}/product`);
  }

  addProduct(product: CreateProductModel) {
    return this.http.post(`${environment.BASE_URL}/product`, product);
  }
}
