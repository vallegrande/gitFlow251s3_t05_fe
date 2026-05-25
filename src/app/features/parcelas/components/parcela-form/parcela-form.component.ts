import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Parcela, ParcelaForm } from '../../../../core/models/parcela.model';

@Component({
  selector: 'app-parcela-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parcela-form.component.html',
  styleUrl: './parcela-form.component.css'
})
export class ParcelaFormComponent implements OnChanges {
  @Input() parcelaEditar: Parcela | null = null;
  @Output() guardar = new EventEmitter<ParcelaForm>();
  @Output() cancelar = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  parcelaForm: FormGroup;
  esEdicion = false;

  constructor() {
    this.parcelaForm = this.fb.group({
      nombre:             ['', [Validators.required, Validators.minLength(3)]],
      ubicacion:          ['', [Validators.required, Validators.minLength(3)]],
      areaHectareas:      ['', [Validators.required, Validators.min(0.01)]],
      tipoSuelo:          ['', [Validators.required, Validators.minLength(2)]],
      responsable:        ['', [Validators.required, Validators.minLength(2)]],
      estadoRiego:        ['', [Validators.required, Validators.minLength(2)]],
      fechaUltimaSiembra: [''],
      produccionEstimada: ['', [Validators.required, Validators.minLength(2)]],
      observaciones:      ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parcelaEditar']) {
      this.esEdicion = !!this.parcelaEditar?.idParcela;
      if (this.esEdicion && this.parcelaEditar) {
        this.parcelaForm.patchValue(this.parcelaEditar);
      } else {
        this.parcelaForm.reset();
      }
    }
  }

  onSubmit(): void {
    if (this.parcelaForm.valid) {
      const formValue = this.parcelaForm.value;
      
      const payload = {
        nombre: formValue.nombre,
        ubicacion: formValue.ubicacion,
        areaHectareas: Number(formValue.areaHectareas),
        tipoSuelo: formValue.tipoSuelo,
        responsable: formValue.responsable,
        estadoRiego: formValue.estadoRiego,
        fechaUltimaSiembra: formValue.fechaUltimaSiembra || null,
        produccionEstimada: String(formValue.produccionEstimada),
        observaciones: formValue.observaciones || "",
        cultivoActual: "", // Campo obligatorio en el DTO del backend
        enUso: false,
        estado: true
      };
      
      this.guardar.emit(payload as any);
    } else {
      this.parcelaForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.parcelaForm.reset();
    this.cancelar.emit();
  }

  esInvalido(name: string): boolean {
    const c = this.parcelaForm.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
