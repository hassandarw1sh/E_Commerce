import { Component, ElementRef, inject, OnChanges, Renderer2, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { FlowbitService } from '../../core/services/flowbit/flowbit.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkmodeDirective } from '../../shared/directive/darkmode.directive';
import { SignService } from '../../core/services/sign/sign.service';
import { CartService } from '../../core/services/cartproduct/cart.service';
import { Cart } from '../../shared/interface/cart';
import { TranslateModule } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/translate/mytranslate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,DarkmodeDirective,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnChanges {
  public _SignService =inject(SignService)
  counternabar!:number
  private _CartService=inject(CartService)
cartProduct:Cart|null=null
isnumber:number=0
@ViewChild('mydiv') div!:ElementRef
@ViewChild('open') open!:ElementRef
@ViewChild('close') close!:ElementRef

navbarOpenClose(){

  this.div.nativeElement.classList.toggle('hidden')
  this.open.nativeElement.classList.toggle('hidden')
  this.close.nativeElement.classList.toggle('hidden')



}


getCart() {
  this._CartService.getCartProduct().subscribe({
  next:(res)=>{
    // console.log(res)
    this.cartProduct=res.data
  this._CartService.isNumberOfCart.next(res.numOfCartItems)

    console.log(this.cartProduct)

  },error:(error)=>{
    console.error('Error:', error)}
    
  })
}
  
  constructor(private flowbiteService: FlowbitService,  private renderer: Renderer2 ) {}
  ngOnInit(): void {
  this.getCart()

    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      // console.log('Flowbite loaded', flowbite);
    });

    this._CartService.isNumberOfCart.subscribe({
      next:(data)=>{
       this.isnumber=data
      }
       })
    
  }
  
  @ViewChild('lanArabic') _langArabic!:ElementRef;
  @ViewChild('langEnglish') _langEnglish!:ElementRef;
  
  
  private readonly _MytranslateService=inject(MytranslateService)

  lang(){
    this._langArabic.nativeElement.classList.toggle('hidden');
    this._langEnglish.nativeElement.classList.toggle('hidden');
    

  }
  setDirection(direction: string) {
    this.renderer.setAttribute(document.documentElement, 'dir', direction);
  }
  change(lang:string):void{
    this._MytranslateService.change(lang)

  }
 ngOnChanges(): void {
  this.getCart()
   
 }
}
