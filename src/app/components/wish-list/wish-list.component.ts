import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cartproduct/cart.service';
import { Details } from '../../shared/interface/details';
import { WishlistService } from '../../core/services/wishList/wishlist.service';
import { Product } from '../../shared/interface/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements  OnInit {

   private readonly _CartService=inject(CartService)
  private toastr=inject(ToastrService)
  private _NgxSpinnerService=inject(NgxSpinnerService)
  private readonly _WishlistService=inject(WishlistService)
  customOptions: OwlOptions  = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
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
        items: 4
      }
    },
    nav: false
  }
   productLove: Product[]=[]
 ngOnInit(): void {
  this._NgxSpinnerService.show("loveProduct")

   this._WishlistService.getWishList().subscribe({

    next:(res)=>{
      this._NgxSpinnerService.hide("loveProduct")
 
      console.log(res.data)
      this.productLove=res.data
    }
   })
 }
 SendProduct(id:string){
  this._NgxSpinnerService.show('loadOne')

 this._CartService.addProduct(id).subscribe({
  next:(res)=>{
    this._NgxSpinnerService.hide('loadOne')

    this.toastr.success(res.message, res.status);
    
    console.log(res)},
  // error:(error)=>console.log("error",error)
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

     
          console.log(res.data)
          this.productLove=res.data
        }


      })
      
      console.log(res)
    }
  })
 }
  
}
