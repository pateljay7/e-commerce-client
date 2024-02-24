import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product.model';
import { Response } from '../shared/models/response.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productList: Product[];
  constructor(private productServie: ProductService) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productServie.fetchProducts().subscribe({
      next: (res: any) => {
        if (res) {
          const data = (res as Response).data as Product[];
          this.productList = data;
          console.log('Product list', this.productList);
        }
      },
      error: (error) => {},
    });
  }
}
