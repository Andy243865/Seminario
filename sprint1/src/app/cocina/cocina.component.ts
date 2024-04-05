import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cocina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cocina.component.html',
  styleUrl: './cocina.component.css'
})
export class CocinaComponent {
  noteEdit = false;
  itemsFlag:boolean;
  pedidos:any[];

  constructor(){
    this.pedidos = this.divideByCat(JSON.parse(localStorage.getItem('pedidos') || '[]'));
    if(this.pedidos.length > 3){
      this.itemsFlag = true;
      this.pedidos = this.balanceChunks(this.sliceIntoChunks(this.pedidos, Math.floor(this.pedidos.length/4)));
    }else{
      this.itemsFlag =false;
      let temp = [];
      for(let i = 0; i < this.pedidos.length; i++){
        const chunk = this.pedidos[i]
        temp.push(chunk);
      }
      this.pedidos = temp;
    }

  }

  divideByCat(arr:any){
    const res:any = [];

    for(let i of arr){    
      const index:any = [];
      for(let j of i.items){
        j.tipo === 'Bebida' ? index.push(i.items.findIndex((k:any) => k === j)) : console.log("No hay bebida");
      }
      index.reverse();
      for(let j of index){
        i.items.splice(j,1);
      }
      i.items.length > 0 ? res.push(i) : console.log("Registro vacio");
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
    return arr;
  }


  itemCant(i:any, op:string){
    switch(op){
      case '+': i.cantidad++; break;
      case '-': i.cantidad > 1 ? i.cantidad-- : i.cantidad; break;
    }
  }
}
