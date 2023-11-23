import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
//reactiveform servisi
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  //formModule olması gerekli ReactiveFormsModule olması gerekir ürünlerimizi ekleyebileceimiz bir ortam hazırlamak için

  productAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  //ürün eklerken gereken kurallar
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(data => {
        console.log(data)
        this.toastrService.success(data.message, 'başarılı');
      },dataError=>{
        console.log(dataError);
        this.toastrService.error(dataError.error)
      });
    } else {
      this.toastrService.error('hata esik form', 'dikkat');
    }
  }
}
