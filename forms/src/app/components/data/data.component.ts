import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {
  forma: FormGroup;
  usuario: any = {
    nombrecompleto: {
      nombre: 'carlos',
      apellido: 'arteaga'
    },
    correo: 'zab@hotmail.com'
  };

  constructor() {
    console.log(this.usuario);
    this.forma = new FormGroup({

      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', Validators.required)
      }),
       'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    });
    this.forma.setValue(this.usuario); // cargar el usuario en el formulario
   }

  ngOnInit() {
  }

  guardarCambios() {
    console.log( this.forma.value );
    console.log( this.forma );

    // pristine es el formulario recien cargado
    this.forma.reset(this.usuario); // lo regresa a su estaod pristine
  }

}
