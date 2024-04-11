import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CocinaComponent } from './cocina/cocina.component';
import { BarraComponent } from './barra/barra.component';
import { CrudComponent } from './crud/crud.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cocina', component: CocinaComponent },
  { path: 'barra', component: BarraComponent },
  { path: 'crud', component: CrudComponent },
  { path: '**', redirectTo: '/inicio' },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];
