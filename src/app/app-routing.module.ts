import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './componentes/alumnos/alumnos.component';
import { FormularioAlumnosComponent } from './formulario-alumnos/formulario-alumnos.component';


const routes: Routes = [
  {path: '', component: AlumnosComponent}, //Ruta por default
  /*
  {path: 'alumnos', component: AlumnosComponent, children: [
    {path: 'agregar', component: FormularioComponent},
  ]},*/
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/editar/:id', component: FormularioAlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
