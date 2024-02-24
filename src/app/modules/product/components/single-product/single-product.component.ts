import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/modules/shared/models/product.model';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent {
  @Input() product: Product;
  @Output() onDeleteSuccess = new EventEmitter();
  constructor(private productService: ProductService) {}
  deleteProduct() {
    const isSure = window.confirm('Are you sure , want to delete product');
    if (isSure)
      this.productService.deleteProduct(this.product._id).subscribe({
        next: (res) => {
          console.log('Product deleted successfully');
          this.onDeleteSuccess.emit();
        },
        error: (error) => {
          console.error('Error while deleting product');
        },
      });
  }
}
