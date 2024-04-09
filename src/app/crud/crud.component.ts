import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Component } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  mesas: any[] = [
    { id: 1, tamaño: 'Mediana', numeroDeSillas: 4 },
    { id: 2, tamaño: 'Grande', numeroDeSillas: 6 },
    // Agrega más mesas si es necesario
  ];

  crearMesa() {
    Swal.fire({
      title: 'Agregar Mesa',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Tamaño">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Número de Sillas">`,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const tamaño = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const numeroDeSillas = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        // Genera un nuevo ID dinámico para la mesa
        const id =
          this.mesas.length > 0 ? this.mesas[this.mesas.length - 1].id + 1 : 1;
        // Crea el objeto de mesa
        const nuevaMesa = { id, tamaño, numeroDeSillas };
        // Agrega la nueva mesa al arreglo de mesas
        this.mesas.push(nuevaMesa);
        // Muestra un mensaje de éxito
        Swal.fire('Agregada', 'La mesa ha sido agregada.', 'success');
      },
    });
  }

  editarMesa(mesa: any) {
    Swal.fire({
      title: 'Editar Mesa',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Tamaño" value="${mesa.tamaño}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Número de Sillas" value="${mesa.numeroDeSillas}">`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const tamaño = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const numeroDeSillas = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        // Actualiza la mesa en el arreglo de mesas
        mesa.tamaño = tamaño;
        mesa.numeroDeSillas = numeroDeSillas;
        // Muestra un mensaje de éxito
        Swal.fire('Editada', 'La mesa ha sido editada.', 'success');
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
        const index = this.mesas.indexOf(mesa);
        if (index !== -1) {
          this.mesas.splice(index, 1);
        }
        Swal.fire('Eliminada', 'La mesa ha sido eliminada.', 'success');
      }
    });
  }

  crearProducto() {
    Swal.fire({
      title: 'Crear Producto',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Platillo">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Cantidad">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Calorías">`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const platillo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const cantidad = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const calorias = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const id =
          this.products.length > 0
            ? this.products[this.products.length - 1].id + 1
            : 1;
        const nuevoProducto = { id, platillo, cantidad, calorias };
        this.products.push(nuevoProducto);
        console.log('Nuevo producto creado:', nuevoProducto);
        Swal.fire('Creado', 'El producto ha sido creado.', 'success');
      },
    });
  }

  editarProducto(producto: any) {
    Swal.fire({
      title: 'Editar Producto',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Platillo" value="${producto.platillo}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Cantidad" value="${producto.cantidad}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Calorías" value="${producto.calorias}">`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const platillo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const cantidad = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const calorias = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        producto.platillo = platillo;
        producto.cantidad = cantidad;
        producto.calorias = calorias;
        console.log('Producto editado:', producto);
        Swal.fire('Editado', 'El producto ha sido editado.', 'success');
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
        const index = this.products.indexOf(producto);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
        Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
      }
    });
  }

  crearUsuario() {
    Swal.fire({
      title: 'Crear Usuario',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Edad">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Correo">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Contraseña">`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const name = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const edad = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const correo = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const contrasenia = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        const id =
          this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
        const nuevoUsuario = { id, name, edad, correo, contrasenia };
        this.users.push(nuevoUsuario);
        console.log('Nuevo usuario creado:', nuevoUsuario);
        Swal.fire('Creado', 'El usuario ha sido creado.', 'success');
      },
    });
  }

  editarUsuario(usuario: any) {
    Swal.fire({
      title: 'Editar Usuario',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="${usuario.name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Edad" value="${usuario.edad}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Correo" value="${usuario.correo}">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Contraseña" value="${usuario.contrasenia}">`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const name = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const edad = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const correo = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const contrasenia = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        usuario.name = name;
        usuario.edad = edad;
        usuario.correo = correo;
        usuario.contrasenia = contrasenia;
        console.log('Usuario editado:', usuario);
        Swal.fire('Editado', 'El usuario ha sido editado.', 'success');
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
        const index = this.users.indexOf(usuario);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
      }
    });
  }

  currentTab: 'products' | 'users' | 'mesas' = 'products';

  users: any[] = [
    {
      id: 1,
      name: 'John Doe',
      edad: 30,
      correo: 'john@example.com',
      contrasenia: '123456',
    },
    {
      id: 2,
      name: 'Jane Doe',
      edad: 25,
      correo: 'jane@example.com',
      contrasenia: 'password',
    },
    {
      id: 3,
      name: 'Test',
      edad: 22,
      correo: 'test@example.com',
      contrasenia: 'qwerty',
    },
    // Agrega más usuarios si es necesario
  ];

  products: any[] = [
    { id: 1, platillo: 'Taco', cantidad: 2, calorias: 150 },
    { id: 2, platillo: 'Burrito', cantidad: 1, calorias: 300 },
    // Agrega más productos si es necesario
  ];
}

@NgModule({
  declarations: [CrudComponent],
  imports: [CommonModule],
})
export class CrudModule {}
