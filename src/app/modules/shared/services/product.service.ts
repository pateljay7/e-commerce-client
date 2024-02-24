import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateProductModel } from '../models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get(`${environment.BASE_URL}/product`).pipe(
      map((response: any) => {
        const productsWithImageUrl = response.data.map((product: any) => ({
          ...product,
          images: product.images.map(
            (image: any) => environment.BASE_URL + image
          ),
        }));
        return { ...response, data: productsWithImageUrl };
      })
    );
  }
  fetchProduct(id: string) {
    return this.http.get(`${environment.BASE_URL}/product/${id}`);
  }

  addProduct(product: any) {
    return this.http.post(`${environment.BASE_URL}/product`, product);
  }

  updateProduct(product: FormData, id: string) {
    return this.http.put(`${environment.BASE_URL}/product/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.BASE_URL}/product/${id}`);
  }

  deleteProductImage(id: string) {
    return this.http.delete(`${environment.BASE_URL}/product/image/${id}`);
  }
}
