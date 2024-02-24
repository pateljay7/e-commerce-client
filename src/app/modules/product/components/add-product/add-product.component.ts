import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/modules/shared/models/product.model';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}
  productForm: FormGroup = this.formBuilder.group({});
  productCategory = ['Electronics', 'Clothing', 'Books', 'Other'];
  ngOnInit(): void {
    this.setInitForm();
  }

  setInitForm() {
    this.productForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.min(13),
        Validators.required,
      ]),
      price: new FormControl('', [Validators.min(1), Validators.required]),
      quantity: new FormControl('', [Validators.min(1), Validators.required]),
      category: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
    });
  }

  onSubmitProduct() {
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (res: any) => {
        this.productForm.reset();
        this.router.navigate(['../']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
