import { Component, Input, input } from '@angular/core';
// import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {  FormGroup, ReactiveFormsModule, } from '@angular/forms';


@Component({
  selector: 'showerror',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './showerror.component.html',
  styleUrl: './showerror.component.scss'
})
export class ShowerrorComponent {
   endEmail: string="@example.com"
@Input() _FormGroup!: FormGroup;
@Input() formControlName!: string;
}
