import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject: any[],term:string ): any[] {
    return arrayOfObject.filter((item)=>item.title.toLowerCase().includes(term.toLowerCase())

    );
  }

// new array
   // ~ filter => products filter object of new products=> if  item of product equals "ahmed"=> new array [0]=item one, two 
   //product = newArray  

}
