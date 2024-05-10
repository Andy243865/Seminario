import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, Renderer2, ViewChild } from '@angular/core';
import { Menu } from '../menu.model';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra.component.html',
  styleUrl: './barra.component.css'
})
export class BarraComponent {
  noteEdit = false;
  itemsFlag = false;
  pedidos:any = [];
  detalles:any;
  users:any;
  mesas:any;
  categorias:any;
  products:any;

  constructor(private dbService : DbserviceService) {
    this.getDetalles();
    this.getUsuarios();
    this.getMesas();    
    this.getProductos();
    this.getCategorias();
  }    

  getCategorias(){
    this.dbService.get('/getCategorias').subscribe((response:any) => {
      this.categorias = response['data'];
    }), (error:any) =>{
      console.log('Error is ',error);
    } 
  }

  getProductos(){
    this.dbService.get('/getProductos').subscribe((response:any) => {
      this.products = response['data'];
    }), (error:any) =>{
      console.log('Error is ',error);
    } 
  }

  getUsuarios(){
    this.dbService.get('/getUsuarios').subscribe((response:any) => {
      this.users = response['data'];
    }), (error:any) =>{
      console.log('Error is ',error);
    } 
  }

  getMesas(){
    this.dbService.get('/getMesas').subscribe((response:any) => {
      this.mesas = response['data'];
    }), (error:any) =>{
      console.log('Error is ',error);
    } 
  }

  getPedidos(){
    this.dbService.get('/getPedidos').subscribe((response:any) => {
      this.prepPedidos(response['data']);
    }), (error:any) =>{
      console.log('Error is ',error);
    }
  }

  getDetalles(){
    this.dbService.get('/getDetalles').subscribe((response:any) => {
      this.detalles = response['data'];
      this.getPedidos();
    }), (error:any) =>{
      console.log('Error is ',error);
    }
  }

  prepPedidos(res:any){ 

    for(let i of res){
      let items:any = [];
      for(let j of this.detalles){
        if(i.ID == j.ID_Pedido){
          let it = {
            ID_Producto: j.ID_Producto,
            Nombre: this.products[this.products.findIndex((k:any) => k.ID === j.ID_Producto)].Nombre,
            Cantidad: j.Cantidad,
            Precio_Unitario: j.Precio_Unitario,
            Subtotal: j.Subtotal,
            Tipo: this.categorias[this.categorias.findIndex((k1:any) => k1.ID ===
              this.products[this.products.findIndex((k2:any) => k2.ID === j.ID_Producto)].ID_Categoria)].Tipo
          }
          items.push(it);
        }
      }
      
      let p = {
        ID: i.ID,
        ID_Usuario: i.ID_Usuario,
        Usuario: this.users[this.users.findIndex((k:any) => k.ID === i.ID_Usuario)].Nombre,
        ID_Mesa: i.ID_Mesa,
        Num_Mesa: this.mesas[this.mesas.findIndex((k:any) => k.ID === i.ID_Mesa)].Num_Mesa,
        items: items,
        Estado: i.Estado,
        noteEdit: false
      }
      this.pedidos.push(p);
    }
    console.log(this.pedidos);

    this.pedidos = this.divideByCat(this.pedidos);
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
        j.Tipo === 'Comida' ? index.push(i.items.findIndex((k:any) => k === j)) : console.log("No hay platillo");
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
      case '+': i.Cantidad++; break;
      case '-': i.Cantidad > 1 ? i.Cantidad-- : i.Cantidad; break;
    }
  }

  updatePedido(i:any){
    if(i.noteEdit){
      for(let j of i.items){
        this.dbService.patch('/patchDetalles',{ ID_Pedido: i.ID, ID_Producto: j.ID_Producto, Cantidad: j.Cantidad, Subtotal: j.Cantidad*j.Precio_Unitario }).then((data:any)=>{
          console.log(data);
          i.noteEdit = false;
        }).catch((err)=>{
           console.log(err);
        }); 
      }
    }else{
      console.log("Activando edicion")
      i.noteEdit = !i.noteEdit
    }
  }

  deleteProducto(i:any, p:any){
    //console.log("Borrando item: ", i.ID, p.ID_Producto);
    
    this.dbService.post('/deleteDetalle',{ ID_Pedido: i.ID, ID_Producto: p.ID_Producto }).then((data:any)=>{
      console.log(data);
      this.pedidos = [];
      this.getDetalles();
    }).catch((err)=>{
       console.log(err);
    }); 
  }
}
