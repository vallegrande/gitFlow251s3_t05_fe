import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioForm } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnChanges {
  @Input() usuarioEditar: Usuario | null = null;
  @Output() guardar = new EventEmitter<UsuarioForm>();
  @Output() cancelar = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  usuarioForm: FormGroup;
  esEdicion = false;

  constructor() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fechaContratacion: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioEditar']) {
      this.esEdicion = !!this.usuarioEditar?.idUsuario;
      if (this.esEdicion && this.usuarioEditar) {
        this.usuarioForm.patchValue({
          nombre: this.usuarioEditar.nombre,
          apellido: this.usuarioEditar.apellido,
          correo: this.usuarioEditar.correo,
          rol: this.usuarioEditar.rol,
          fechaContratacion: this.usuarioEditar.fechaContratacion || ''
        });
        this.usuarioForm.get('password')?.clearValidators();
        this.usuarioForm.get('password')?.updateValueAndValidity();
      } else {
        this.usuarioForm.reset();
        this.usuarioForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.usuarioForm.get('password')?.updateValueAndValidity();
      }
    }
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.guardar.emit(this.usuarioForm.value);
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.usuarioForm.reset();
    this.cancelar.emit();
  }

  esInvalido(name: string): boolean {
    const c = this.usuarioForm.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
