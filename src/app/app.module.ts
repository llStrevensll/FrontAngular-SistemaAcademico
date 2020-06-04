import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AlumnosComponent } from './componentes/alumnos/alumnos.component';
import { ProfesoresComponent } from './componentes/profesores/profesores.component';
import { AlumnosService } from './services/alumnos.service';
import { FormularioAlumnosComponent } from './formulario-alumnos/formulario-alumnos.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    ProfesoresComponent,
    FormularioAlumnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AlumnosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
