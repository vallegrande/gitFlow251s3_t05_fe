import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario, UsuarioForm } from '../../../core/models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { NotificationService } from '../../../core/services/notification.service';
import { UsuarioFormComponent } from '../components/usuario-form/usuario-form.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToggleFilterComponent } from '../../../shared/components/toggle-filter/toggle-filter.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, UsuarioFormComponent, ConfirmDialogComponent, ToggleFilterComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  usuarios: Usuario[] = [];
  usuarioEditar: Usuario | null = null;
  mostrarFormulario = false;
  verActivos = true;

  mostrarConfirmacion = false;
  usuarioAEliminar: number | null = null;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  toggleActivos(activos: boolean): void {
    this.verActivos = activos;
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerPorEstado(this.verActivos).subscribe({
      next: (data) => { 
        this.usuarios = data;
        this.cdr.markForCheck();
      },
      error: () => { 
        this.usuarios = [];
        this.cdr.markForCheck();
      }
    });
  }

  nuevoUsuario(): void {
    this.usuarioEditar = null;
    this.mostrarFormulario = true;
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioEditar = usuario;
    this.mostrarFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  guardarUsuario(usuario: UsuarioForm): void {
    if (this.usuarioEditar?.idUsuario) {
      this.usuarioService.editar(this.usuarioEditar.idUsuario, usuario).subscribe({
        next: () => { this.cargarUsuarios(); this.cancelarEdicion(); },
        error: () => {}
      });
    } else {
      this.usuarioService.crear(usuario).subscribe({
        next: () => { this.cargarUsuarios(); this.cancelarEdicion(); },
        error: () => {}
      });
    }
  }

  confirmarEliminar(id: number): void {
    this.usuarioAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  eliminarUsuario(): void {
    if (this.usuarioAEliminar) {
      this.usuarioService.eliminar(this.usuarioAEliminar).subscribe({
        next: () => {
          this.notificationService.show({ type: 'success', message: 'Usuario eliminado correctamente' });
          this.cargarUsuarios();
          this.cancelarConfirmacion();
        },
        error: () => {}
      });
    }
  }

  restaurarUsuario(id: number): void {
    this.usuarioService.restaurar(id).subscribe({
      next: () => {
        this.notificationService.show({ type: 'success', message: 'Usuario restaurado correctamente' });
        this.cargarUsuarios();
      },
      error: () => {}
    });
  }

  cancelarEdicion(): void {
    this.usuarioEditar = null;
    this.mostrarFormulario = false;
  }

  cancelarConfirmacion(): void {
    this.mostrarConfirmacion = false;
    this.usuarioAEliminar = null;
  }

  getRolClass(rol: string): string {
    const map: Record<string, string> = {
      ADMIN: 'badge--red',
      SUPERVISOR: 'badge--blue',
      OPERADOR: 'badge--green'
    };
    return map[rol] || 'badge--gray';
  }

  getAdmins(): number {
    return this.usuarios.filter(u => u.rol === 'ADMIN').length;
  }

  getOperadores(): number {
    return this.usuarios.filter(u => u.rol === 'OPERADOR').length;
  }
}
