import { Component, Input } from '@angular/core';
import { Product } from 'src/app/modules/shared/models/product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent {
  @Input() product: Product;
}
