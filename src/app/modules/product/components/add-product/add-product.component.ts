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
  selectedImages: File[] = [];
  ngOnInit(): void {
    this.setInitForm();
  }

  setInitForm() {
    this.productForm = this.formBuilder.group({
      name: new FormControl('test proud', [Validators.required]),
      description: new FormControl('nskjkjskjbd', [
        Validators.min(13),
        Validators.required,
      ]),
      price: new FormControl('111', [Validators.min(1), Validators.required]),
      quantity: new FormControl('11', [Validators.min(1), Validators.required]),
      category: new FormControl('Other', [Validators.required]),
      manufacturer: new FormControl('nkcjbkbck', [Validators.required]),
      images: new FormControl([], [Validators.required]),
    });
  }

  onSubmitProduct() {
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
    this.productService.addProduct(formData).subscribe({
      next: (res: any) => {
        this.productForm.reset();
        this.router.navigate(['../']);
      },
      error: (error) => {
        console.error(error);
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
