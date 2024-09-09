import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService);
  let sH: string = ''
  // if ( ) {
  //   sH = "homeLoading"
  //   _NgxSpinnerService.show(sH)
  // }
  // if (req.url.includes('cart')){
  //   sH = "cartLoading"
  //   _NgxSpinnerService.show(sH)
  // }
  if (req.url.includes('home')||  (req.url.includes('products') && !/\/products\/[a-zA-Z0-9]+/.test(req.url))){
    sH = "productLoading"
    _NgxSpinnerService.show(sH)
  }
  return next(req).pipe(finalize(() => {

    _NgxSpinnerService.hide(sH)

  }));
};
