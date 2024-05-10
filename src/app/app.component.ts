import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { Collapse, CollapseInterface, CollapseOptions, InstanceOptions, initFlowbite } from 'flowbite';
import { CommonModule, Location, NgFor } from '@angular/common';
import { DbserviceService } from './dbservice.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sprint1';
 
  @ViewChild('pedidos') pedidos!: ElementRef;
  pedidoChk = 1;
  //pedidoChk:boolean = false;
  tipoPedido:string = ''; 

  constructor(private route: Router, private location: Location){
    /*if(location.path() == '/cocina'){
      this.pedidoChk = 4;
      this.tipoPedido = 'cocina';
    }else if(location.path() == '/barra'){
      this.pedidoChk = 4;
      this.tipoPedido = 'barra';
    }else if(location.path() == '/menu'){
      this.pedidoChk = 3;
    }else if(location.path() == '/crud'){
      this.pedidoChk = 2;
    }else{
      this.pedidoChk = 1;
    }*/
  }
  
  ngAfterContentChecked(){
    if(this.location.path() == '/mesas'){
      this.pedidoChk = 5;
    }else if(this.location.path() == '/cocina'){
      this.pedidoChk = 4;
      this.tipoPedido = 'cocina';
    }else if(this.location.path() == '/barra'){
      this.pedidoChk = 4;
      this.tipoPedido = 'barra';
    }else if(this.location.path() == '/menu'){
      this.pedidoChk = 3;
    }else if(this.location.path() == '/crud'){
      this.pedidoChk = 2;
    }else {
      this.pedidoChk = 1;
    }
  }

  ngOnInit(){
    initFlowbite();
  }

  pedidosClick(c:boolean){
    //this.pedidoChk = c;
    this.tipoPedido = c ? this.tipoPedido : '';
  }

  toggleType(b:boolean){
    this.tipoPedido = b ? 'cocina' : 'barra';
    this.pedidos.nativeElement.click();
  }
}
