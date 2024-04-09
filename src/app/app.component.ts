import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { Collapse, CollapseInterface, CollapseOptions, InstanceOptions, initFlowbite } from 'flowbite';
import { CommonModule, Location, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sprint1';
 
  @ViewChild('pedidos') pedidos!: ElementRef;
  
  pedidoChk:boolean = false;
  tipoPedido:string = ''; 

  constructor(private route: Router, private location: Location) {
    if(location.path() == '/cocina'){
      this.pedidoChk = true;
      this.tipoPedido = 'cocina';
    }else if(location.path() == '/barra'){
      this.pedidoChk = true;
      this.tipoPedido = 'barra';
    }
  }
  
  ngOnInit(){
    initFlowbite();
  }

  pedidosClick(c:boolean){
    this.pedidoChk = c;
    this.tipoPedido = c ? this.tipoPedido : '';
  }

  toggleType(b:boolean){
    this.tipoPedido = b ? 'cocina' : 'barra';
    this.pedidos.nativeElement.click();
  }
}
