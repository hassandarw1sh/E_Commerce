import { Component } from '@angular/core';
import { FlowbitService } from '../../core/services/flowbit/flowbit.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkmodeDirective } from '../../shared/directive/darkmode.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,DarkmodeDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbitService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
