import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
                   //reactiveform servisi 
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
//formModule olması gerekli ReactiveFormsModule olması gerekir ürünlerimizi ekleyebileceimiz bir ortam hazırlamak için
  
productAddForm:FormGroup;

constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  //ürün eklerken gereken kurallar
  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }


}
