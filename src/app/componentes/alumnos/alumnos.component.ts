import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumnos } from "src/app/models/alumnos";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumnos[] = [];
  //Objeto para el modal
  alumno: Alumnos = {
    idAlumno: 0,
    nombre : '',
    apellido: '',
    telefono: ''
  }

  //alumnoForm definido al inicio del formulario - (resetar formulario)
  @ViewChild("alumnoForm") alumnoForm: NgForm;

  //Definido en el boton de cerrar
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(public alumnosService: AlumnosService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  //Imprimir arreglo de alumnos
  imprimirArreglo(alumnos: Alumnos[]){
    for (let alumno of alumnos){
      console.log(alumno);
    }
  }

  ngOnInit(): void {
    this.alumnosService.cargarAlumnos()
      .subscribe(
        (alumnosObtenidos: Alumnos[]) => {
          //cargar datos en el arreglo local
          this.alumnos = alumnosObtenidos;
          this.alumnosService.setAlumnos(this.alumnos);//actualizar arreglo alumnos en el service
          this.imprimirArreglo(this.alumnos);
        }
      );
  }

  crearAlumno({value, valid}: {value: Alumnos, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000//mensaje alert 4 seg
      });
    }else{
      //Agregar el nuevo cliente
      this.alumnosService.agregarAlumno(value);
      this.alumnoForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }


  eliminarAlumno(alumno: Alumnos){
    if (confirm('¿Seguro que desea eliminar el cliente?')) {
      this.alumnosService.eliminarAlumno(alumno.idAlumno);
      this.router.navigate(['/alumnos']);
    }

  }

}
