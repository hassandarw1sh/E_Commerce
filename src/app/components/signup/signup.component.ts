import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowerrorComponent } from "../../shared/showerror/showerror.component";
import { NgClass } from '@angular/common';
import { __values } from 'tslib';
import { SignService } from '../../core/services/sign/sign.service';
import { Router } from '@angular/router';
// import { Router } from 'express';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, ShowerrorComponent ,NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  endEmail: string="@example.com"
  getError: string=""
  isBottonSub: boolean = false;
  private readonly _SingService=inject(SignService);
  private readonly  _FormBuilder=inject(FormBuilder);
  private readonly  _Router=inject(Router);
  
 register: FormGroup =this._FormBuilder.group({
  name:[null,[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]).{8,}$/)]],
    rePassword:[null],

 },{Validators:[this.confirmPassword] })
  // register=new FormGroup({
  //   name:new FormControl(null,[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  //   email:new FormControl(null,[Validators.required, Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]).{8,}$/)]),
  //   rePassword:new FormControl(null),
  // },this.confirmPassword)
   sendData(){
    this.isBottonSub=true;

    if(this.register.valid){
      console.log(this.register);
      this.getdata();
    }
   }
   confirmPassword(g:AbstractControl){
     return g.get('password')?.value==g.get('rePassword')?.value ? null :{mismatch:true}

   }
   getdata(){
    this._SingService.signup(this.register.value).subscribe({
      next:(res)=>{
       
        if(res.message=="success"){
          this._Router.navigate(['/signin'])

          console.log(res);
          this.isBottonSub=false;
          this.getError="";
        }

        

      },
      error:(err)=>{console.error(err)
        this.getError=err.error.message;
        this.isBottonSub=false;

      }
    })

   }

  
}
