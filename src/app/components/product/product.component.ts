import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http'; //backendisteği
import { response } from 'express';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      (this.products = response.data), (this.dataLoaded = true);
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        (this.products = response.data), (this.dataLoaded = true);
      });
  }

  addToCart(prodcut: Product) {
    if (prodcut.productId === 1) {
      this.toastrService.error(prodcut.productName, 'ürün sepete eklenemez');
    } else {
      this.toastrService.success('sepete eklendi', prodcut.productName);
      this.cartService.addToCart(prodcut);
    }
  }
}
