import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { obtenerPorEstadoConFallback } from '../../../core/services/crud-base.service';
import { Parcela, ParcelaDTO } from '../../../core/models/parcela.model';

@Injectable({ providedIn: 'root' })
export class ParcelaService {
  private apiService = inject(ApiService);
  private endpoint = '/parcelas';

  listarTodos(): Observable<Parcela[]> {
    return this.apiService.getAll<Parcela>(this.endpoint);
  }

  obtenerPorId(id: number): Observable<Parcela> {
    return this.apiService.getById<Parcela>(this.endpoint, id);
  }

  /** Usa /estado/{estado} con fallback automático a listarTodos + filtro local */
  obtenerPorEstado(estado: boolean): Observable<Parcela[]> {
    return obtenerPorEstadoConFallback<Parcela>(this.apiService, this.endpoint, estado);
  }

  crear(parcela: ParcelaDTO): Observable<Parcela> {
    return this.apiService.create<Parcela>(this.endpoint, parcela);
  }

  editar(id: number, parcela: ParcelaDTO): Observable<Parcela> {
    return this.apiService.update<Parcela>(this.endpoint, id, parcela);
  }

  eliminar(id: number): Observable<Parcela> {
    return this.apiService.patch<Parcela>(`${this.endpoint}/${id}/eliminar`);
  }

  restaurar(id: number): Observable<Parcela> {
    return this.apiService.patch<Parcela>(`${this.endpoint}/${id}/restaurar`);
  }
}
