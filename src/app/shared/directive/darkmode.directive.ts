import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDarkmode]',
  standalone: true
})
export class DarkmodeDirective {

  constructor() { }
  @HostListener("change") onChange(){

 
    document.body.classList.toggle("dark")
  }

}
