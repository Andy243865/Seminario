import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Menu } from '../menu.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  openTab = 1;
  edicion = false;
  noteEdit = false;
  noteModal = false;
  detailsModal = false;
  alertModal = false;
  tabSecc:any;
  menu:any = Menu;
  d = {
    id: '',
    imagen: '',
    nombre: '',
    descripcion: '',
    receta: '',
    precio: '',
    tipo: '',
    cantidad: 0
  };
  items : any[] = [];
  mesa:FormControl = new FormControl('1');

  constructor() {
    const divMenu = this.divideByCat(this.menu);

    this.tabSecc  = {
      divPla:this.sliceIntoChunks(divMenu.pla, Math.floor(divMenu.pla.length/4)),
      divPos:this.sliceIntoChunks(divMenu.pos, Math.floor(divMenu.pos.length/4)),
      divBeb:this.sliceIntoChunks(divMenu.beb, Math.floor(divMenu.beb.length/4))
    }

    this.tabSecc.divPla = this.balanceChunks(this.tabSecc.divPla);
    this.tabSecc.divPos = this.balanceChunks(this.tabSecc.divPos);
    this.tabSecc.divBeb = this.balanceChunks(this.tabSecc.divBeb);
  }

  divideByCat(arr:any){
    const res:any = {
      pla:[],
      pos:[],
      beb:[]
    };

    for(let i of arr){
      switch(i.tipo){
        case 'Platillo': res.pla.push(i); break;
        case 'Postre': res.pos.push(i); break;
        case 'Bebida': res.beb.push(i); break;
      }
    }

    return res;
  }

  sliceIntoChunks(arr:any, chunkSize:number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }

  balanceChunks(arr:any){
    const rem = arr.length - 4;
    if(rem == 1){
      arr[0] = arr[0].concat(arr[4]);
    }else if(rem == 2){
      arr[0] = arr[0].concat(arr[4]);      
      arr[1] = arr[1].concat(arr[5]);
    }else if(rem == 2){
      arr[0] = arr[0].concat(arr[4]);      
      arr[1] = arr[1].concat(arr[5]);      
      arr[2] = arr[2].concat(arr[6]);
    }
    arr.splice(4,rem);
    //console.log(arr);
    return arr;
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  } 

  addItem(i:any){
    const item:any = {
      id: i.id,
      nombre: i.nombre,
      cantidad: i.cantidad,
      tipo: i.tipo,
      precio: i.precio
    };
  
    if(this.items.findIndex((k) => k.id === item.id) < 0 && item.cantidad > 0) {
      //console.log("Item nuevo");
      this.items.push(item);
    }else{
      //console.log("Pedido duplicado");
      this.items[this.items.findIndex((k) => k.id === item.id)].cantidad += item.cantidad;
    }

    i.cantidad = 0;
  }

  removeItem(i:any){
    this.items.splice(this.items.findIndex((k) => k.id === i.id),1);
  }

  setDetailModal(id:string){
    for(let i of Menu){
      if(id == i.id){
        this.d = i;
      }
    }
  }

  itemMod(i:any, op:string, cat:string){
    switch(op){
      case '+': i.cantidad++; break;
      case '-': (cat == 'note' && i.cantidad > 1) ? i.cantidad-- : (cat == 'menu' && i.cantidad > 0) ? i.cantidad-- : i.cantidad; break;
    }
  }

  submit(){
    let pedido = {
      items: this.items,
      mesa: this.mesa.value,
      mesero: 'Mesero'
    }
    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    this.items = [];
    this.edicion = false;
  }
}
