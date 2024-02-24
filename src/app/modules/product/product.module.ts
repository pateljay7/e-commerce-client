import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    SingleProductComponent,
    ProductEditComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'product/add-product',
        component: AddProductComponent,
      },
      {
        path: 'product/edit/:id',
        component: ProductEditComponent,
      },
      {
        path: '**',
        redirectTo: 'product',
      },
    ]),
  ],
})
export class ProductModule {}
