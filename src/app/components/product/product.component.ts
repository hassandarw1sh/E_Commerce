import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../shared/interface/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  allProducts:Product[] = [];
  pageTWo:string="";
  getProductsPageTwo(){
    this.pageTWo="?page=2"
    this.getProduct();
  }
  getProductsPageOne(){
    this.pageTWo=""
    this.getProduct();
    
  }
  constructor(private _ProductsService: ProductsService){}
 getProduct(){
  this._ProductsService.getProducts(this.pageTWo).subscribe({
    next: (res) =>this.allProducts=res.data,
    error: (error) => console.error('Error:', error)
  })
 }
 ngOnInit(): void {
  this.getProduct();
 }

 

}
