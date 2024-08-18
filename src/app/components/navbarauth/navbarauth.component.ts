import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbitService } from '../../core/services/flowbit/flowbit.service';

@Component({
  selector: 'app-navbarauth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbarauth.component.html',
  styleUrl: './navbarauth.component.scss'
})
export class NavbarauthComponent {
  constructor(private flowbiteService: FlowbitService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      // console.log('Flowbite loaded', flowbite);
    });
  }

}
