import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario, UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  //en el constructor solo se inicializan los servicios
  //y se inyectan los servicios que se van a utilizar
  usuarioForm!: FormGroup;
  mensaje: string = '';
  modoEdicion: boolean = false;
  usuarioId?: number;

  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
 
    this.listarUsuarios();
  }

 listarUsuarios() {
  this.usuarioService.listarUsuarios().subscribe({
    next: (data) => this.usuarios = data,
    error: () => this.mensaje = 'Error al cargar los usuarios'
  });
 }

  guardar() {
    if (this.usuarioForm.invalid) {
      this.mensaje = 'Por favor, complete todos los campos requeridos.';
      return;
    }
    const usuario: Usuario = this.usuarioForm.value;

    if (this.modoEdicion && this.usuarioId) {
      this.usuarioService.actualizarUsuario(this.usuarioId, usuario).subscribe({
        next: () => {
          this.mensaje = 'Usuario actualizado correctamente.';
          this.usuarioForm.reset();
          this.modoEdicion = false;
          this.usuarioId = undefined;
          this.listarUsuarios();
        },
        error: (error) => {
          this.mensaje = 'Error al actualizar el usuario: ' + error.message;
        }
      });
    } else {
      this.usuarioService.insertarUsuario(usuario).subscribe({
        next: () => {
          this.mensaje = 'Usuario insertado correctamente.';
          this.usuarioForm.reset();
          this.listarUsuarios();
        },
        error: (error) => {
          this.mensaje = 'Error al insertar el usuario: ' + error.message;
        }
      });
    }
  }

  editar(id: number) {
    this.usuarioService.buscarUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue(usuario);
        this.modoEdicion = true;
        this.usuarioId = id;
        this.mensaje = '';
      },
      error: (error) => {
        this.mensaje = 'Error al buscar el usuario: ' + error.message;
      }
    }); 

  }

  eliminar(id: number) {
    if(!confirm('¿Estás seguro de eliminar este usuario?')) return;

    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        this.mensaje = 'Usuario eliminado correctamente.';
        this.listarUsuarios();
      },
      error: (error) => {
        this.mensaje = 'Error al eliminar el usuario: ' + error.message;
      }
    });
    
  }

}
