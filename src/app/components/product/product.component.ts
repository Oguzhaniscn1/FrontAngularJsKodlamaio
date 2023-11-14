import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http';//backendisteği
import { ProductResponseModel } from '../../models/productResponseModel';
import { response } from 'express';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products:Product[]=[];
  dataLoaded=false;
  productResponseModel:ProductResponseModel={
    data:this.products,
    message:"",
    success:true
  }

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){
    this.productService.getProducts().subscribe(response=>{
      this.products=response.data,
      this.dataLoaded=true
    })
    
  }

}
