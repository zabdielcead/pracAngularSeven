import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


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
       'username': new FormControl( '' , Validators.required, this.existeUsuario), // el trcer parametro es validador asincrono
       'password1': new FormControl( '', Validators.required ),
       'password2': new FormControl(  )
    });
   // this.forma.setValue(this.usuario); // cargar el usuario en el formulario
     this.forma.controls['password2'].setValidators([
        Validators.required,
        this.noIgual.bind(this.forma)  // bind especificar un valor a this por defecto
     ]);

     // detectar cambios en la forma this.forma.valueChanges
     this.forma.controls['username'].valueChanges   // escuchar un cambio de un campo
       .subscribe(data => {
        console.log(data);
       });

      // ver el status del control en cuestion para ver si es valido o no

      this.forma.controls['username'].statusChanges   // escuchar un cambio de un campo
      .subscribe(data => {
       console.log(data);
      });
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
  existeUsuario( control: FormControl ): Promise<any> | Observable<any> {
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          if (control.value === 'strider') {
            resolve( {existe: true} );
          } else {
            resolve( null);
          }
        }, 3000);
    });
    return promesa;
  }
}
