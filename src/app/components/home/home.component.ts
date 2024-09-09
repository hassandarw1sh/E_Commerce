import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../shared/interface/product';
import { SignService } from '../../core/services/sign/sign.service';
import { sign } from 'crypto';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { error } from 'console';
import { Category } from '../../shared/interface/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cartproduct/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishList/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,CurrencyPipe,SearchPipe,FormsModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  text: string=""
  private readonly _CartService=inject(CartService);
  private  toastr=inject(ToastrService)
  private _NgxSpinnerService=inject(NgxSpinnerService)

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl:true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout: 1000,
    // autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
   
    },
    nav: false}

  customOptionsCat : OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl:true,

    autoplay:true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    
    navSpeed: 700,
    navText: ['', ''],
  
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  // slider
  
  
  private scrollPosition: number = 0;

  allProducts:Product[] = [];
  allCategories:Category[]= [];
  pageTWo:string="";
  private readonly _ProductsService=inject(ProductsService);
  private readonly _signServices=inject(SignService);
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _WishlistService=inject(WishlistService);
  isAddProduct:boolean=false
  isWish:Product[]=[]




  constructor(){
    // this._signServices.UserData()
  }
 getProduct(){
  this._ProductsService.getProducts(this.pageTWo).subscribe({
    next: (res) =>this.allProducts=res.data,
    error: (error) => console.error('Error:', error)
  })
 }
 getCategory(){
  this._CategoriesService.getCategories().subscribe({
next:(res) =>{
  console.log(res.data)
  this.allCategories=res.data;
},
error:(error)=>console.error('Error:', error)
  })

 }

 ngOnInit(): void {
  this.getCategory();
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
 AddToCart(id:string):void{

  this._NgxSpinnerService.show('loadOne')
  this._CartService.addProduct(id).subscribe({
    next:(res)=>{console.log(res)
      this._CartService.isNumberOfCart.next(res.numOfCartItems)

      this._NgxSpinnerService.hide('loadOne')
    this.toastr.success(res.message, res.status);

    },
    error:(err)=>console.error('Error:',err)
  })
 }

 AddWishList(id:string){
  this._WishlistService.addProductWishList(id).subscribe({
    next:(res)=>{
      this.toastr.success(res.message, res.status);
      this.isWish=res.data

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
