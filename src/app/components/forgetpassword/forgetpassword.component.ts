import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { SignService } from '../../core/services/sign/sign.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  isSuccess: boolean = false;
  step: number = 1
  // @ViewChild('_formEmail') _formEmail!:ElementRef;
  private _SignService = inject(SignService);
  private _FormBuilder = inject(FormBuilder)
  private _Router=inject(Router)
  forgetpasswordFrom: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.email, Validators.required]]
  })
  Verifypassword: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(6)]]
  })
  NewPassword: FormGroup = this._FormBuilder.group({

    email: [null, [Validators.email]],
    newPassword: [null
      , [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]).{8,}$/
        ),
      ]
    ]

  })

  ngOnInit() {
    console.log(this.forgetpasswordFrom)
  }
  getData() {
    console.log(this.forgetpasswordFrom.value)
    this.isSuccess = true;
    // console.log("----------------", this.forgetpasswordFrom.value)
  let valueEmail=  this.forgetpasswordFrom.get('email')?.value
  this.NewPassword.get('email')?.patchValue(valueEmail) 
  this._SignService.forgetPasswordEmail(this.forgetpasswordFrom.value).subscribe({

      next: (res) => {
        if (res.statusMsg == "success") {
          this.isSuccess = false;
          // console.log(res);
          this.step = 2;

        } else {
          console.log("erro");
        }
      },
      error: (error) => {
        console.error('Error:', error)
        this.isSuccess = false;

      }
    })

  }
  getVeify() {
    this.isSuccess = true;
    console.log("----------------", this.Verifypassword.value)

    this._SignService.forgetPasswordCode(this.Verifypassword.value).subscribe({
      next: (res) => {
        if (res.status == "Success") {
          this.isSuccess = false;
          console.log(res);
          this.step = 3;
        }


      }
      , error: (error) => {
        console.error('Error:', error)
        this.isSuccess = false;
      }
    })


  }
  getNewPassword(){
    this._SignService.newPassword(this.NewPassword.value).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token)
        this._Router.navigate(['/home'])
      },
    })
  }
}
