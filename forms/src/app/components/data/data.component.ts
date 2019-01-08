import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


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
    correo: 'zab@hotmail.com',
    // pasatiempos: ['correr', 'dormir', 'comer']
  };

  constructor() {
    console.log(this.usuario);
    this.forma = new FormGroup({

      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.noHerrera]) // noHerrera va sin parentesis ojo
      }),
       'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       'pasatiempos': new FormArray([
         new FormControl('Correr', Validators.required)
       ]),
       'password1': new FormControl( '', Validators.required ),
       'password2': new FormControl(  )
    });
   // this.forma.setValue(this.usuario); // cargar el usuario en el formulario
     this.forma.controls['password2'].setValidators([
        Validators.required,
        this.noIgual.bind(this.forma)  // bind especificar un valor a this por defecto
     ]);
   }

  ngOnInit() {
  }

  guardarCambios() {
    console.log( this.forma.value );
    console.log( this.forma );

    // pristine es el formulario recien cargado
    this.forma.reset(this.usuario); // lo regresa a su estaod pristine
  }

  agregarPasatiempo() {
    (<FormArray> this.forma.controls['pasatiempos']).push(
      new FormControl('Dormir', Validators.required)
    );
  }

  noHerrera( control: FormControl ): {[s: string]: boolean} {
    if ( control.value === 'herrera' ) {
      return {
        noherrera: true
      };
    }
    return null;
  }
  noIgual( control: FormControl ): {[s: string]: boolean} {
    console.log(this);
    let formas: any = this;

    if ( control.value !== formas.controls['password1'].value ) {
      return {
        noiguales: true
      };
    }
    return null;
  }
}
