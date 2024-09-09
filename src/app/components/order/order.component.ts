import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { OrderService } from '../../core/services/order/order.service';
import { tick } from '@angular/core/testing';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})

export class OrderComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrderService=inject(OrderService)
  private _NgxSpinnerService=inject(NgxSpinnerService)

  id : string|null=""
  private _FormBuilder = inject(FormBuilder);
  orderDetails: FormGroup = this._FormBuilder.group({
    details: [null,[Validators.required]],
    phone:  [null,[Validators.required]],
    city:  [null,[Validators.required]],
  })

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'))
        this.id = param.get('id')
      }
    })
  }
sendDetails(){
  this._NgxSpinnerService.show('loadThreeOrder')
  this._OrderService.Checkout(this.id,this.orderDetails.value).subscribe({
    next:(res)=>{console.log(res.session.url)
      if(res.status=="success"){
    this._NgxSpinnerService.hide('loadThreeOrder')
        
        // _self or _blank target

        window.open(res.session.url,'self')
      }
    },
    error:(error)=>console.log("error",error)


  })
}
}
