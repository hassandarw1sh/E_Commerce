import { Component, inject, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../shared/interface/product';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cartproduct/cart.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishList/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,TitleCasePipe,CurrencyPipe,SalePipe,SearchPipe,FormsModule,NgClass,TranslateModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  {
  private readonly _WishlistService=inject(WishlistService);
  private scrollPosition: number = 0;
  private readonly _CartService=inject(CartService)
  private  toastr=inject(ToastrService)
  private _NgxSpinnerService=inject(NgxSpinnerService)

  isAddProduct:boolean=true
  
 text: string=""
 isWishList!:Boolean
  allProducts:Product[] = [];
  pageTWo:string="";
  isWish:Product[]=[]

  rl:boolean=localStorage.getItem('lang')=="en"
  getProductsPageTwo(){
    this.pageTWo="?page=2"
    this.getProduct();
    this.scrollPosition =window.scrollY;
    window.scrollTo(window.scrollY,0);
  }
getAllProductSub!:Subscription
  getProductsPageOne(){
    this.pageTWo=""
    this.getProduct();
    this.scrollPosition =window.scrollY;
    window.scrollTo(window.scrollY,0);
    
  }
  
  constructor(private _ProductsService: ProductsService){}
 getProduct(){
  this.getAllProductSub=this._ProductsService.getProducts(this.pageTWo).subscribe({
    next: (res) =>{this.allProducts=res.data
      console.log(res.data)

    },

    error: (error) => console.error('Error:', error)
  })
 }
 ngOnInit(): void {
  this.getProduct();

  this._WishlistService.getWishList().subscribe({

    next:(res)=>{
      console.log(res.data)
      console.log(res.data)
      for(let item of res.data){
        this.isWish.push(item._id)
      }

 
      console.log(this.isWish)
    
    }
   })


 }
 ngonDestroy(): void {
  this.getAllProductSub?.unsubscribe();
 }
 SendProduct(id:string){
  this._NgxSpinnerService.show('loadOne')
 


 this._CartService.addProduct(id).subscribe({
  next:(res)=>{
  this._NgxSpinnerService.hide('loadOne')
  this._CartService.isNumberOfCart.next(res.numOfCartItems)
    this.toastr.success(res.message, res.status);
    
    console.log(res)
  },
  // error:(error)=>console.log("error",error)
 })
 }
 AddWishList(id:string){

  this._WishlistService.addProductWishList(id).subscribe({
    next:(res)=>{
      this.isWish=res.data
      this.toastr.success(res.message, res.status);

      console.log(res)
    }
  })

 }
 removeLoveOfProduct(id:string){
  this._NgxSpinnerService.show('loadTwo')

  this._WishlistService.removeLove(id).subscribe({
    next:(res)=>{
      // this.productLove=res.data
      this._WishlistService.getWishList().subscribe({
        
        next:(res)=>{
       
    this._NgxSpinnerService.hide('loadTwo')

    this.isWish=res.data
          console.log(res.data)
         
        }


      })
      
      console.log(res)
    }
  })
 }



 

}
