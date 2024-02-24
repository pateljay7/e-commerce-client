import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

@NgModule({
  declarations: [ProductComponent, SingleProductComponent, ProductEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: '**',
        redirectTo: 'product',
      },
    ]),
  ],
})
export class ProductModule {}
