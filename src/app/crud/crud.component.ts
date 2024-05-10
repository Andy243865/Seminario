import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  
  currentTab: 'products' | 'users' | 'mesas' = 'products';

  select = true;

  mesas: any;
  users: any;
  products: any;
  
  constructor( private dbService : DbserviceService) {
    this.getMesas();
    this.getProductos();
    this.getUsuarios();
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

  ngOnInit() {}

  crearMesa() {
    Swal.fire({
      title: 'Agregar Mesa',
      html:
      `<input type="number" id="swal-input1" class="swal2-input" placeholder="Numero de Mesa">` +
      `<input type="number" id="swal-input2" class="swal2-input" placeholder="Capacidad">` +
      `<br><select name="" id="swal-input3" class="swal2-select" placeholder="Estado">
        <option value="0">Disponible</option>
        <option value="1">Ocupada</option>
      </select>`,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const Num_Mesa = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const Capacidad = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const Estado = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        // Agrega la nueva mesa al arreglo de mesas
        this.dbService.post('/postMesa',{ Num_Mesa: Num_Mesa, Capacidad: Capacidad, Estado: Estado }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
          Swal.fire('Agregada', 'La mesa ha sido agregada.', 'success');
          this.getMesas();
        }).catch((err)=>{
           console.log(err);
        }); 
      },
    });
  }

  editarMesa(mesa: any) {
    Swal.fire({
      title: 'Editar Mesa',
      html:
      `<input type="number" id="swal-input1" class="swal2-input" placeholder="Numero de Mesa" value="${mesa.Num_Mesa}">` +
      `<input type="number" id="swal-input2" class="swal2-input" placeholder="Capacidad" value="${mesa.Capacidad}">` +
      `<br><select name="" id="swal-input3" class="swal2-select" placeholder="Estado">
        <option ${mesa.Estado == '0' ? "selected" : ""} value="0">Disponible</option>
        <option ${mesa.Estado == '1' ? "selected" : ""} value="1">Ocupada</option>
      </select>`, 
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const Num_Mesa = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const Capacidad = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const Estado = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        // Actualiza la mesa en el arreglo de mesas
        this.dbService.patch('/patchMesa',{ Num_Mesa: Num_Mesa, Capacidad: Capacidad, Estado: Estado, ID: mesa.ID }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
          Swal.fire('Editada', 'La mesa ha sido editada.', 'success');
          this.getMesas();
        }).catch((err)=>{
           console.log(err);
        }); 
      },
    });
  }

  eliminarMesa(mesa: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina la mesa del arreglo de mesas
        this.dbService.post('/deleteMesa',{ ID: mesa.ID }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
          Swal.fire('Eliminada', 'La mesa ha sido eliminada.', 'success');
          this.getMesas();
        }).catch((err)=>{
           console.log(err);
        }); 
      }
    });
  }

  crearProducto() {
    Swal.fire({
      title: 'Crear Producto',
      html:
      `<input id="swal-input1" class="swal2-input" type="text" placeholder="Nombre">
      <textarea id="swal-input2" class="swal2-textarea" name="" id="" placeholder="Descripcion"></textarea>
      <input id="swal-input3" class="swal2-input" type="text" placeholder="Imagen">
      <input id="swal-input4" class="swal2-input" type="number" name="" id="" placeholder="Precio">
      <select id="swal-input5" class="swal2-select" name="" id="">
        <option value="1">Platillos</option>
        <option value="2">Bebidas</option>
        <option value="3">Bebidas con Alcohol</option>
        <option value="4">Postres</option>
        <option value="5">Entradas</option>
      </select>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const Nombre = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const Descripcion = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const Imagen = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const Precio = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        const ID_Categoria = (
          document.getElementById('swal-input5') as HTMLInputElement
        ).value;
        this.dbService.post('/postProducto',{ Nombre: Nombre, Descripcion: Descripcion, Imagen: Imagen, Precio: Precio, ID_Categoria: ID_Categoria }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
        Swal.fire('Creado', 'El producto ha sido creado.', 'success');
          this.getProductos();
        }).catch((err)=>{
           console.log(err);
        });
      },
    });
  }

  editarProducto(producto: any) {
    Swal.fire({
      title: 'Editar Producto',
      html:
      `<input id="swal-input1" class="swal2-input" type="text" placeholder="Nombre" value="${producto.Nombre}">
      <textarea id="swal-input2" class="swal2-textarea" name="" id="" placeholder="Descripcion">${producto.Descripcion}</textarea>
      <input id="swal-input3" class="swal2-input" type="text" placeholder="Imagen" value="${producto.Imagen}">
      <input id="swal-input4" class="swal2-input" type="number" name="" id="" placeholder="Precio" value="${producto.Precio}">
      <select id="swal-input5" class="swal2-select" name="" id="">
        <option ${producto.ID_Categoria == '1' ? "selected" : ""} value="1">Platillos</option>
        <option ${producto.ID_Categoria == '2' ? "selected" : ""} value="2">Bebidas</option>
        <option ${producto.ID_Categoria == '3' ? "selected" : ""} value="3">Bebidas con Alcohol</option>
        <option ${producto.ID_Categoria == '4' ? "selected" : ""} value="4">Postres</option>
        <option ${producto.ID_Categoria == '5' ? "selected" : ""} value="5">Entradas</option>
      </select>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const Nombre = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const Descripcion = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const Imagen = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const Precio = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        const ID_Categoria = (
          document.getElementById('swal-input5') as HTMLInputElement
        ).value;
        this.dbService.patch('/patchProducto',{ Nombre: Nombre, Descripcion: Descripcion, Imagen: Imagen, Precio: Precio, ID_Categoria: ID_Categoria, ID: producto.ID }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
        Swal.fire('Editado', 'El producto ha sido editado.', 'success');
          this.getProductos();
        }).catch((err)=>{
           console.log(err);
        });
      },
    });
  }

  eliminarProducto(producto: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dbService.post('/deleteProducto',{ ID: producto.ID }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
        Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
          this.getProductos();
        }).catch((err)=>{
           console.log(err);
        });
      }
    });
  }

  crearUsuario() {
    Swal.fire({
      title: 'Crear Usuario',
      html:
      `<input id="swal-input1" class="swal2-input" type="text" placeholder="Nombre">
      <input id="swal-input2" class="swal2-input" type="email" placeholder="Correo">
      <input id="swal-input3" class="swal2-input" type="password" placeholder="Contraseña">
      <input id="swal-input4" class="swal2-input" type="text" placeholder="Direccion">
      <input id="swal-input5" class="swal2-select" type="number" placeholder="Telefono">
      <select id="swal-input6" class="swal2-select">
        <option value="1">Cocinero</option>
        <option value="2">Chef</option>
        <option value="3">Hostess</option>
        <option value="4">Mesero</option>
        <option value="5">Bartender</option>
        <option value="6">Limpieza</option>
        <option value="7">Capitan</option>
      </select>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const Nombre = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const Correo = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const Contrasena = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const Direccion = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        const Telefono = (
          document.getElementById('swal-input5') as HTMLInputElement
        ).value
        const ID_Puesto = (
          document.getElementById('swal-input6') as HTMLInputElement
        ).value;
        this.dbService.post('/postUsuario',{ Nombre: Nombre, Correo: Correo, Contrasena: Contrasena, Direccion: Direccion, Telefono: Telefono, ID_Puesto: ID_Puesto }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
          Swal.fire('Creado', 'El usuario ha sido creado.', 'success');
          this.getUsuarios();
        }).catch((err)=>{
           console.log(err);
        });
      },
    });
  }

  editarUsuario(usuario: any) {
    Swal.fire({
      title: 'Editar Usuario',
      html:
      `<input id="swal-input1" class="swal2-input" type="text" placeholder="Nombre" value="${usuario.Nombre}">
      <input id="swal-input2" class="swal2-input" type="email" placeholder="Correo" value="${usuario.Correo}">
      <input id="swal-input3" class="swal2-input" type="password" placeholder="Contraseña" value="${usuario.Contrasena}">
      <input id="swal-input4" class="swal2-input" type="text" placeholder="Direccion" value="${usuario.Direccion}">
      <input id="swal-input5" class="swal2-select" type="number" placeholder="Telefono" value="${usuario.Telefono}">
      <select id="swal-input6" class="swal2-select">
        <option ${usuario.ID_Puesto == '1' ? "selected" : ""} value="1">Cocinero</option>
        <option ${usuario.ID_Puesto == '2' ? "selected" : ""} value="2">Chef</option>
        <option ${usuario.ID_Puesto == '3' ? "selected" : ""} value="3">Hostess</option>
        <option ${usuario.ID_Puesto == '4' ? "selected" : ""} value="4">Mesero</option>
        <option ${usuario.ID_Puesto == '5' ? "selected" : ""} value="5">Bartender</option>
        <option ${usuario.ID_Puesto == '6' ? "selected" : ""} value="6">Limpieza</option>
        <option ${usuario.ID_Puesto == '7' ? "selected" : ""} value="7">Capitan</option>
      </select>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const Nombre = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const Correo = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const Contrasena = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const Direccion = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        const Telefono = (
          document.getElementById('swal-input5') as HTMLInputElement
        ).value
        const ID_Puesto = (
          document.getElementById('swal-input6') as HTMLInputElement
        ).value;
        this.dbService.patch('/patchUsuario',{ Nombre: Nombre, Correo: Correo, Contrasena: Contrasena, Direccion: Direccion, Telefono: Telefono, ID_Puesto: ID_Puesto, ID: usuario.ID }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
          Swal.fire('Editado', 'El usuario ha sido editado.', 'success');
          this.getUsuarios();
        }).catch((err)=>{
           console.log(err);
        });
      },
    });
  }

  eliminarUsuario(usuario: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dbService.post('/deleteUsuario',{ ID: usuario.ID }).then((data:any)=>{
          console.log(data);
          // Muestra un mensaje de éxito
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          this.getUsuarios();
        }).catch((err)=>{
           console.log(err);
        });
      }
    });
  }
}

@NgModule({
  declarations: [CrudComponent],
  imports: [CommonModule],
})
export class CrudModule {}