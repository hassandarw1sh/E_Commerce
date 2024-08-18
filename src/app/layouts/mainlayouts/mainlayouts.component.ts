import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-mainlayouts',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './mainlayouts.component.html',
  styleUrl: './mainlayouts.component.scss'
})
export class MainlayoutsComponent {

}
