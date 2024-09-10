import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('mydiv') div!:ElementRef
  @ViewChild('open') open!:ElementRef
  @ViewChild('close') close!:ElementRef
  navbarOpenClose(){

    this.div.nativeElement.classList.toggle('hidden')
    this.open.nativeElement.classList.toggle('hidden')
    this.close.nativeElement.classList.toggle('hidden')
  
  
  
  }
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      // console.log('Flowbite loaded', flowbite);
    });
  }

}
