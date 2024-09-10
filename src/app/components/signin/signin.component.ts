import { Component, inject } from '@angular/core';
import { SignService } from '../../core/services/sign/sign.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isBottonSub: boolean = false;
  private readonly _SingService = inject(SignService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  register: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]).{8,}$/
        ),
      ],
    ],
  });

  sendData() {
    this.isBottonSub = true;

    if (this.register.valid) {
      console.log(this.register);
      this.getdata();
    }
  }

  getdata() {
     this._NgxSpinnerService.show('signin')
    this._SingService.signIn(this.register.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.setItem("token",res.token)
     

      this._Router.navigate(['/home']);
      this._NgxSpinnerService.hide('signin')
          console.log(res);
          this.isBottonSub = false;
        }
      },
      error: (err) => {
        console.error(err);
        this._NgxSpinnerService.hide('signin')

        this.isBottonSub = false;
      },
    });
  }
}
