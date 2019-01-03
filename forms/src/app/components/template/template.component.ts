import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
    `
      .ng-invalid.ng-touched:not(form){
        border: 1px solid red;
      }
    `
  ]
})
export class TemplateComponent {
  usuario  = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: 'MX',
    sexo: 'Hombre',
    acepta: false
  };
  paises = [{
    codigo: 'CRI',
    nombre: 'COSTARICA'
  }, {
    codigo: 'ESP',
    nombre: 'ESPAÑA'
  },
  {
    codigo: 'MX',
    nombre: 'MEXICO'
  }

];
sexos: string[] = ['Hombre', 'Mujer'];
  constructor() { }

  guardar(forma: NgForm) {
    console.log('postedadooo');
    console.log('ngForm', forma);
    console.log('valor', forma.value);
    console.log('usuario', this.usuario);
  }
}
