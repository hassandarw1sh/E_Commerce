import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarauthComponent } from "../../components/navbarauth/navbarauth.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-authlayouts',
  standalone: true,
  imports: [RouterOutlet, NavbarauthComponent, FooterComponent],
  templateUrl: './authlayouts.component.html',
  styleUrl: './authlayouts.component.scss'
})
export class AuthlayoutsComponent {

}
