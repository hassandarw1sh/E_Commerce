import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Details } from '../../shared/interface/details';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { CartService } from '../../core/services/cartproduct/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CarouselModule,UpperCasePipe,LowerCasePipe,CurrencyPipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {
  private readonly _CartService=inject(CartService)
  private toastr=inject(ToastrService)
  private _NgxSpinnerService=inject(NgxSpinnerService)

  customOptions: OwlOptions = {
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
   productDetails:Details |null=null
  private readonly _ProductsDetailsService=inject(ProductsService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
 ngOnInit(): void {

   this._ActivatedRoute.paramMap.subscribe({
    next:(data)=>{console.log(data.get('_id'));
      this._NgxSpinnerService.show('loadThree')

     let product =data.get('_id') 
      
      this._ProductsDetailsService.getProductDetails(product).subscribe({
        next:(res)=>{
          console.log(res)
    this._NgxSpinnerService.hide('loadThree')

          this.productDetails=res.data
        },
        error:(error)=>console.error('Error:', error)
      })
    },
  })
 
 }
 SendProduct(id:string){
  this._NgxSpinnerService.show('loadThreeAdd')

  this._CartService.addProduct(id).subscribe({
   next:(res)=>{
    this._NgxSpinnerService.hide('loadThreeAdd')

     this.toastr.success(res.message, res.status);
     
     console.log(res)},
   error:(error)=>console.log("error",error)
  })
  }
}
