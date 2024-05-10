import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Menu } from '../menu.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DbserviceService } from '../dbservice.service';

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
  //menu:any = Menu;
  menu:any;
  ingredientes:any;
  receta:any;
  mesas:any;
  pedidos:any;
  d = {
    Imagen: '',
    Nombre: '',
    receta: [],
    Precio: '',
  };
  items : any[] = [];
  mesa:FormControl = new FormControl('');

  constructor(private activatedRoute: ActivatedRoute, private dbService : DbserviceService) {
    this.getPedidos();
    this.getProductos();
    this.getMesas();
    this.getRecetas();
  }

  ngOnInit(){    
    document.getElementById('menu')?.scrollIntoView({behavior: 'smooth'});
  }

  getProductos(){
    this.dbService.get('/getProductos').subscribe((response:any) => {
      this.prepMenu(response['data']);
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

  getRecetas(){   
    this.dbService.get('/getReceta').subscribe((response:any) => {
      this.receta = response['data'];
    }), (error:any) =>{
      console.log('Error is ',error);
    } 
    this.dbService.get('/getIngredientes').subscribe((response:any) => {
      this.ingredientes = response['data'];
    }), (error:any) =>{
      console.log('Error is ',error);
    } 
  }

  getPedidos(){
    this.dbService.get('/getPedidos').subscribe((response:any) => {
      this.pedidos = response['data'];
    }), (error:any) =>{
      console.log('Error is ',error);
    }
  }

  prepMenu(res:any){
    this.menu = res;
    const divMenu = this.divideByCat(res);

    this.tabSecc  = {
      divPla:this.sliceIntoChunks(divMenu.pla, Math.floor(divMenu.pla.length/4)),
      divPos:this.sliceIntoChunks(divMenu.pos, Math.floor(divMenu.pos.length/4)),
      divBeb:this.sliceIntoChunks(divMenu.beb, Math.floor(divMenu.beb.length/4)),
      divAlc:this.sliceIntoChunks(divMenu.alc, Math.floor(divMenu.alc.length/4)),
      divEnt:this.sliceIntoChunks(divMenu.ent, Math.floor(divMenu.ent.length/4))
    }

    this.tabSecc.divPla = this.balanceChunks(this.tabSecc.divPla);
    this.tabSecc.divPos = this.balanceChunks(this.tabSecc.divPos);
    this.tabSecc.divBeb = this.balanceChunks(this.tabSecc.divBeb);
    this.tabSecc.divAlc = this.balanceChunks(this.tabSecc.divAlc);
    this.tabSecc.divEnt = this.balanceChunks(this.tabSecc.divEnt);
  }

  /*jumpTo(section:any){
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
  }*/

  divideByCat(arr:any){
    const res:any = {
      pla:[],
      pos:[],
      beb:[],
      alc:[],
      ent:[]
    };

    for(let i of arr){

      let temp = {
        ID: i.ID,
        Nombre: i.Nombre,
        Descripcion: i.Descripcion,
        Imagen: i.Imagen,
        Precio: i.Precio,
        ID_Categoria: i.ID_Categoria,
        cantidad: 0
      }

      switch(i.ID_Categoria){
        case 1: res.pla.push(temp); break;
        case 2: res.beb.push(temp); break;
        case 3: res.alc.push(temp); break;
        case 4: res.pos.push(temp); break;
        case 5: res.ent.push(temp); break;
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
    }else if(rem == 3){
      arr[0] = arr[0].concat(arr[4]);      
      arr[1] = arr[1].concat(arr[5]);      
      arr[2] = arr[2].concat(arr[6]);
    }
    arr.splice(4,rem);
    return arr;
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  } 

  addItem(i:any){
    const item:any = {
      ID: i.ID,
      Nombre: i.Nombre,
      cantidad: i.cantidad,
      ID_Categoria: i.ID_Categoria,
      Precio: i.Precio
    };
  
    if(this.items.findIndex((k) => k.ID === item.ID) < 0 && item.cantidad > 0) {
      //console.log("Item nuevo");
      this.items.push(item);
    }else{
      //console.log("Pedido duplicado");
      this.items[this.items.findIndex((k) => k.ID === item.ID)].cantidad += item.cantidad;
    }

    i.cantidad = 0;
  }

  removeItem(i:any){
    this.items.splice(this.items.findIndex((k) => k.ID === i.ID),1);
  }

  setDetailModal(id:string){
    let detallePlatillo:any = [];
    for(let i of this.receta){
      if(id == i.ID_Producto){
        for(let j of this.ingredientes){
          if(i.ID_Ingrediente == j.ID){
            detallePlatillo.push(j.Descripcion);
          }
        }
      }
    }
    
    this.d.receta = detallePlatillo;

    for(let i of this.menu){
      if(id == i.ID){
        this.d.Imagen = i.Imagen;
        this.d.Nombre = i.Nombre;
        this.d.Precio = i.Precio;
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
    let d = new Date();
    let fecha_hora = [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-')+' '+[d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    
    this.dbService.post('/postPedidos',{ ID_Usuario: 26, Fecha_Hora: fecha_hora, Estado: 'P', ID_Mesa: this.mesa.value }).then((data:any)=>{
      this.insertDetalles(data['data']);
    }).catch((err)=>{
       console.log(err);
    });
  }

  insertDetalles(id:any){    
    for(let i of this.items){
      this.dbService.post('/postDetalles',{ ID_Pedido: id, ID_Producto: i.ID, Cantidad: i.cantidad, Precio_Unitario: i.Precio, Subtotal: i.cantidad*i.Precio }).then((data:any)=>{
        console.log(data);
        this.items = [];
        this.edicion = false;
        this.mesa.setValue('');
      }).catch((err)=>{
         console.log(err);
      }); 
    }
  }
}
