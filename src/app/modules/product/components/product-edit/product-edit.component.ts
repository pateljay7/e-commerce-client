import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modules/shared/models/product.model';
import { Response } from 'src/app/modules/shared/models/response.model';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  product: Product;
  productForm: FormGroup;
  productCategory = ['Electronics', 'Clothing', 'Books', 'Other'];
  selectedImages: File[] = [];
  existingImage: string[] = [];

  ngOnInit(): void {
    console.log('1');

    this.route.paramMap.subscribe((data: any) => {
      console.log('Parasms', data.params['id']);
      this.productService.fetchProduct(data.params['id']).subscribe({
        next: (res) => {
          this.product = (res as Response).data;
          console.log('pro', this.product);
          this.existingImage = this.product.images;
          this.setInitForm();
        },
        error: (error) => {},
      });
    });
  }

  setInitForm() {
    this.productForm = this.formBuilder.group({
      name: new FormControl(this.product.name, [Validators.required]),
      description: new FormControl(this.product.description, [
        Validators.min(13),
        Validators.required,
      ]),
      price: new FormControl(this.product.price, [
        Validators.min(1),
        Validators.required,
      ]),
      quantity: new FormControl(this.product.quantity, [
        Validators.min(1),
        Validators.required,
      ]),
      category: new FormControl(this.product.category, [Validators.required]),
      manufacturer: new FormControl(this.product.manufacturer, [
        Validators.required,
      ]),
      images: new FormControl(this.product.images, [Validators.required]),
    });
    console.log('form', this.productForm);
  }

  onSaveProduct() {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('quantity', this.productForm.get('quantity')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append(
      'manufacturer',
      this.productForm.get('manufacturer')?.value
    );

    for (let i = 0; i < this.selectedImages.length; i++) {
      formData.append(
        'images',
        this.selectedImages[i],
        this.selectedImages[i].name
      );
    }
    this.productService.updateProduct(formData, this.product._id).subscribe({
      next: (res) => {
        this.router.navigate(['../']);
      },
      error: (error) => {
        console.log('Error while updating productu');
      },
    });
  }
  onImageChange(event: any): void {
    const files: FileList = event.target.files;
    this.selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);
    }
  }
}
