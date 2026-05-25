import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { obtenerPorEstadoConFallback } from '../../../core/services/crud-base.service';
import { Usuario, UsuarioDTO } from '../../../core/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiService = inject(ApiService);
  private endpoint = '/usuarios';

  listarTodos(): Observable<Usuario[]> {
    return this.apiService.getAll<Usuario>(this.endpoint);
  }

  obtenerPorId(id: number): Observable<Usuario> {
    return this.apiService.getById<Usuario>(this.endpoint, id);
  }

  /** Usa /estado/{estado} con fallback automático a listarTodos + filtro local */
  obtenerPorEstado(estado: boolean): Observable<Usuario[]> {
    return obtenerPorEstadoConFallback<Usuario>(this.apiService, this.endpoint, estado);
  }

  crear(usuario: UsuarioDTO): Observable<Usuario> {
    return this.apiService.create<Usuario>(this.endpoint, usuario);
  }

  editar(id: number, usuario: UsuarioDTO): Observable<Usuario> {
    return this.apiService.update<Usuario>(this.endpoint, id, usuario);
  }

  eliminar(id: number): Observable<Usuario> {
    return this.apiService.patch<Usuario>(`${this.endpoint}/${id}/eliminar`);
  }

  restaurar(id: number): Observable<Usuario> {
    return this.apiService.patch<Usuario>(`${this.endpoint}/${id}/restaurar`);
  }
}
