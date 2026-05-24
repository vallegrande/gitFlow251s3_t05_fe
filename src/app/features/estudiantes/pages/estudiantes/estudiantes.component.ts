import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  standalone: false,
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent {

  /* PASOS DEL FORMULARIO */
  paso = 1;

  /* FORMULARIO */
  estudianteForm: FormGroup;

  /* LISTA */
  estudiantes: any[] = [];

  /* MODAL DETALLES */
  estudianteSeleccionado: any = null;

  /* EDITAR */
  editando = false;

  indiceEditando: number | null = null;

  constructor(private fb: FormBuilder) {

    this.estudianteForm = this.fb.group({

      nombre: [''],
      apellido: [''],
      correo: [''],
      telefono: [''],
      edad: [''],
      carrera: [''],
      codigo: [''],
      fechaNacimiento: [''],
      genero: [''],
      direccion: ['']

    });

  }

  /* GUARDAR */
  guardarEstudiante() {

    if (this.editando) {

      this.estudiantes[this.indiceEditando!] =
        this.estudianteForm.value;

      this.editando = false;

      this.indiceEditando = null;

    } else {

      this.estudiantes.push(
        this.estudianteForm.value
      );

    }

    /* RESET */
    this.estudianteForm.reset();

    /* VOLVER AL PASO 1 */
    this.paso = 1;

  }

  /* EDITAR */
  editarEstudiante(estudiante: any, index: number) {

    this.estudianteForm.patchValue(estudiante);

    this.editando = true;

    this.indiceEditando = index;

    /* IR AL PASO 1 */
    this.paso = 1;

  }

  /* ELIMINAR */
  eliminarEstudiante(index: number) {

    this.estudiantes.splice(index, 1);

  }

}