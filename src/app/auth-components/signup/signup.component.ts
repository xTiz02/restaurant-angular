import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';///para usar ngIf, ngFor, etc
import { AuthService } from '../../auth-services/auth-service/auth.service';
import {  FormControl,FormBuilder, FormGroup,ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzGridModule } from 'ng-zorro-antd/grid';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule,NzFormModule, NzSpinModule, NzButtonModule, FormsModule,ReactiveFormsModule,NzInputModule,NzGridModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private service: AuthService, private fb:FormBuilder, private notification:NzNotificationService) {}

  isSpinning: boolean = false;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) { 
      return { required: true };//si el campo esta vacio
    } else if (control.value !== this.validateform.controls.password.value) {
      return { confirm: true, error: true };//si el campo no es igual al campo password
    }
    return {};
  }
  


  validateform = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]]
  });
  
  register(){
     console.log('Se le pasa del fornt: \n'+JSON.stringify(this.validateform.value));
     this.service.signup(this.validateform.value).subscribe(res=>{
      console.log('Se le responde al front \n: '+JSON.stringify(res));
      this.isSpinning = true;
      if(res.id != null){
        this.notification.success('Registro exitoso', 'Se ha registrado correctamente',{nzDuration: 5000});
      }else{
        this.notification.error('Error', 'No se ha podido registrar',{nzDuration: 5000});
      }

     });
  }



}
/*
constructor(private fb: FormBuilder) { }
  //los valores de estas variables se muestran en el formulario y se sincronizan con los valores del formulario
  // get name() { return this.formUser.get('name') as FormControl; }
  // get email() { return this.formUser.get('email') as FormControl; }

  get name() { return this.formUser.controls['name']; }//hace que el formulario se sincronice con los valores de estas variables
  get email() { return this.formUser.controls['email']; }


  // formUser = new FormGroup({
  //   name: new FormControl('',[Validators.required, Validators.minLength(4)]),
  //   email : new FormControl('',[Validators.required, Validators.email])
  // });
  formUser = this.fb.group({
    name: ['lol', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]]
  });
  //el primer parametro es el valor por defecto del campo, el segundo parametro es un array de validaciones

  procesarFormulario(){
    console.log(this.formUser.value);
  }*/
