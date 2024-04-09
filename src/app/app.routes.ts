import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CocinaComponent } from './cocina/cocina.component';
import { BarraComponent } from './barra/barra.component';
import { CrudComponent } from './crud/crud.component';

export const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cocina', component: CocinaComponent },
  { path: 'barra', component: BarraComponent },
  { path: 'crud', component: CrudComponent },
  { path: '**', redirectTo: '/menu' },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];
