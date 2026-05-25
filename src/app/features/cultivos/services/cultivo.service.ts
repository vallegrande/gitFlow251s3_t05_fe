import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { obtenerPorEstadoConFallback } from '../../../core/services/crud-base.service';
import { Cultivo, CultivoDTO } from '../../../core/models/cultivo.model';

@Injectable({ providedIn: 'root' })
export class CultivoService {
  private apiService = inject(ApiService);
  private endpoint = '/cultivos';

  listarTodos(): Observable<Cultivo[]> {
    return this.apiService.getAll<Cultivo>(this.endpoint);
  }

  obtenerPorId(id: number): Observable<Cultivo> {
    return this.apiService.getById<Cultivo>(this.endpoint, id);
  }

  /** Usa /estado/{estado} con fallback automático a listarTodos + filtro local */
  obtenerPorEstado(estado: boolean): Observable<Cultivo[]> {
    return obtenerPorEstadoConFallback<Cultivo>(this.apiService, this.endpoint, estado);
  }

  crear(cultivo: CultivoDTO): Observable<Cultivo> {
    return this.apiService.create<Cultivo>(this.endpoint, cultivo);
  }

  editar(id: number, cultivo: CultivoDTO): Observable<Cultivo> {
    return this.apiService.update<Cultivo>(this.endpoint, id, cultivo);
  }

  eliminar(id: number): Observable<Cultivo> {
    return this.apiService.patch<Cultivo>(`${this.endpoint}/${id}/eliminar`);
  }

  restaurar(id: number): Observable<Cultivo> {
    return this.apiService.patch<Cultivo>(`${this.endpoint}/${id}/restaurar`);
  }
}
