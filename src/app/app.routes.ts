import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio',    loadComponent: () => import('./core/layouts/inicio/inicio.component').then(m => m.InicioComponent) },
  { path: 'usuarios',  loadComponent: () => import('./features/usuarios/pages/usuarios.component').then(m => m.UsuariosComponent) },
  { path: 'parcelas',  loadComponent: () => import('./features/parcelas/pages/parcelas.component').then(m => m.ParcelasComponent) },
  { path: 'productos', loadComponent: () => import('./features/productos/pages/productos.component').then(m => m.ProductosComponent) },
  { path: 'cultivos',  loadComponent: () => import('./features/cultivos/pages/cultivos.component').then(m => m.CultivosComponent) },
  { path: '**', redirectTo: 'inicio' }
];
