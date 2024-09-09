import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cartproduct/cart.service';
import { Cart } from '../../shared/interface/cart';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
private readonly _CartService=inject(CartService)
cartProduct:Cart|null=null
private  toastr=inject(ToastrService)
private _NgxSpinnerService=inject(NgxSpinnerService)

ngOnInit() {
  this.getCart()
 

}
getCart() {
  this._NgxSpinnerService.show('cartLoading')
  this._CartService.getCartProduct().subscribe({
  next:(res)=>{
    // console.log(res)
    this.cartProduct=res.data
    console.log(this.cartProduct)
  this._NgxSpinnerService.hide('cartLoading')


  },error:(error)=>{
    console.error('Error:', error)}
    
  })
}
deleteProduct(id:string):void{
  this._NgxSpinnerService.show('deleteProduct')
  this._CartService.removeProduct(id).subscribe({
    next:(res)=>{console.log(res)
  this._NgxSpinnerService.hide('deleteProduct')
  this._CartService.isNumberOfCart.next(res.numOfCartItems)

    this.cartProduct=res.data
    this.toastr.success(res.message, res.status);

    },
    error:(error)=>console.log("error",error)
  })
}
deleteAllProduct():void{
  this._NgxSpinnerService.show('deleteLoading')

  this._CartService.removeAllProduct().subscribe({
    next:(res)=>{console.log(res)
  this._CartService.isNumberOfCart.next(res.numOfCartItems)

  this._NgxSpinnerService.hide('deleteLoading')

      this.cartProduct=res.data
    this.toastr.success(res.message, res.status);

  
      },
      error:(error)=>console.log("error",error)

  })
}
UpdateQuantity(id:string,count:number){
  this._CartService.UpdateCartProductQuantity(id,count).subscribe({
    next:(res)=>{console.log(res)
      this.cartProduct=res.data
  
      },
      error:(error)=>console.log("error",error)
  })

}

}
