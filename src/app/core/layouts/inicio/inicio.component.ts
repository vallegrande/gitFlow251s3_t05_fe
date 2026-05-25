import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../features/usuarios/services/usuario.service';
import { ParcelaService } from '../../../features/parcelas/services/parcela.service';
import { ProductoService } from '../../../features/productos/services/producto.service';
import { CultivoService } from '../../../features/cultivos/services/cultivo.service';
import { Usuario } from '../../models/usuario.model';
import { Parcela } from '../../models/parcela.model';
import { Producto } from '../../models/producto.model';
import { Cultivo } from '../../models/cultivo.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InicioComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private parcelaService = inject(ParcelaService);
  private productoService = inject(ProductoService);
  private cultivoService = inject(CultivoService);
  private cdr = inject(ChangeDetectorRef);

  totalUsuarios = 0;
  totalParcelas = 0;
  totalProductos = 0;
  totalCultivos = 0;

  ngOnInit(): void {
    this.usuarioService.obtenerPorEstado(true).subscribe({ 
      next: (d: Usuario[]) => { this.totalUsuarios = d.length; this.cdr.markForCheck(); }, 
      error: () => {} 
    });
    this.parcelaService.obtenerPorEstado(true).subscribe({ 
      next: (d: Parcela[]) => { this.totalParcelas = d.length; this.cdr.markForCheck(); }, 
      error: () => {} 
    });
    this.productoService.obtenerPorEstado(true).subscribe({ 
      next: (d: Producto[]) => { this.totalProductos = d.length; this.cdr.markForCheck(); }, 
      error: () => {} 
    });
    this.cultivoService.obtenerPorEstado(true).subscribe({ 
      next: (d: Cultivo[]) => { this.totalCultivos = d.length; this.cdr.markForCheck(); }, 
      error: () => {} 
    });
  }
}
