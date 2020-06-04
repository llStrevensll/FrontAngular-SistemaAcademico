import { Component, OnInit } from '@angular/core';
import { Alumnos } from '../models/alumnos';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AlumnosService } from '../services/alumnos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-alumnos',
  templateUrl: './formulario-alumnos.component.html',
  styleUrls: ['./formulario-alumnos.component.css']
})
export class FormularioAlumnosComponent implements OnInit {

  alumno: Alumnos = {
    idAlumno: 0,
    nombre : '',
    apellido: '',
    telefono: ''
  }

  id:number;

  constructor(public alumnosService: AlumnosService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);//Recibir id
    this.alumnosService.buscarAlumno(this.id).subscribe( (alumno: Alumnos) => {
      //cargar datos en el arreglo local
      this.alumno = alumno;
    });
  }

  guardarAlumno({value, valid}: {value: Alumnos, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else {
      value.idAlumno = this.id;
      //Modificar Alumno
      this.alumnosService.modificarAlumno(value.idAlumno, value);
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }


}
