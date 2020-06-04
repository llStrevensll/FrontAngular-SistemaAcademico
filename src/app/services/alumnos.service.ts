import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Alumnos } from '../models/alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnos: Alumnos[] = [];

  constructor(private httpClient: HttpClient) { }

  readonly urlBase = 'http://localhost:8585/rest-sistema-academico/webservice/alumnos';

  //Inicializar - Modificar arreglo alumnos
  setAlumnos(alumnos: Alumnos[]) {
    this.alumnos = alumnos;
  }

  //Get
  cargarAlumnos() {
    return this.httpClient.get(this.urlBase);
  }

  //Get
  buscarAlumno(idAlumno: number){
    const alumno: Alumnos = this.alumnos.find(alumno => alumno.idAlumno == idAlumno);
    /*
    const alumno: Alumnos = this.alumnos.find(alumno => {
      //Si encuentra el mismo id
      if (alumno.idAlumno == idAlumno) {
        return alumno;
      }
    });*/

    //Formar url
    let url: string;
    url = this.urlBase + '/' + idAlumno;
    return this.httpClient.get(url);

    //console.log('Alumno encontrado: ' + alumno.idAlumno + ' ' + alumno.nombre);
    //return alumno;

  }

  //Post
  agregarAlumno(alumno: Alumnos){
    console.log("Alumno a agregar: " + alumno.nombre);
    return this.httpClient.post(this.urlBase, alumno).subscribe(
      (alumno: Alumnos) => {// Desde el back obtener el id -> en el back esta el metodo flush
        //Recuperar id
        console.log('Se agrega al arreglo el alumno adicionado:' + alumno.idAlumno);
        this.alumnos.push(alumno);
      }
    );
  }

  //Put
  modificarAlumno(idAlumno: number, alumno: Alumnos){
    console.log('Alumno a modificar: ' + alumno.idAlumno);
    const alumnoModificado = this.alumnos.find(alumno => alumno.idAlumno == idAlumno);
    alumnoModificado.idAlumno = alumno.idAlumno;
    alumnoModificado.nombre = alumno.nombre;

    //Formar url
    let url: string;
    url = this.urlBase + '/' + idAlumno;
    this.httpClient.put(url, alumno).subscribe(
      (response) => {
        console.log("Resultado modificar alumno: " + response);
      },
      (error) => console.log("Error en modificar alumno:" + error)
    );
  }

  //Delete
  eliminarAlumno(idAlumno: number){
    console.log('eliminar alumno con id:' + idAlumno);
    const index = this.alumnos.findIndex(alumno => alumno.idAlumno == idAlumno); //Encuentra el indice en el arreglo
    this.alumnos.splice(index,1);//eliminar del arreglo

    let url: string;
    url = this.urlBase + '/' + idAlumno;
    console.log(url);

    this.httpClient.delete(url).subscribe(
      (response) => {
        console.log("Resultado eliminar alumno: " + response);
      },
      (error) => console.log("Error en modificar alumno:" + error)
    );
  }





}
