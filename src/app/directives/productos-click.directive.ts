import { HostListener, HostBinding } from "@angular/core";
import { Directive } from '@angular/core';

@Directive({
  selector: '[appProductosClick]'
})
export class ProductosClickDirective {

  clickN = 1;
  //Podemos editar el elemento del DOM desde la directiva
  // @HostBinding('style.opacity') opacity: number = .1; //actua como variable de tip numero.
  
  // con @HostListener podemos escuchar los eventos del DOM
  //primer parametro el evento
  //segundo parametro captura el evento y el target es el elemento del html
  @HostListener('click',['$event.target']) onclick(btn){
          console.log('a',btn,"Numero de clicks" , this.clickN++)
          // this.opacity += .1;
  }

}
