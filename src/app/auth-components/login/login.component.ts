import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder,ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StorageService } from '../../auth-services/storage-service/storage.service';
import { Router } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,NzFormModule,ReactiveFormsModule ,NzSpinModule, NzButtonModule, FormsModule ,NzInputModule,NzGridModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private service: AuthService, private fb:FormBuilder, private router: Router){}

    isSpinning: boolean = false;
/*get name() { return this.formUser.controls['name']; }//hace que el formulario se sincronice con los valores de estas variables
  get email() { return this.formUser.controls['email']; }*/

    loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
  });

  submitForm(){
    console.log('Login que envia el front: \n'+JSON.stringify(this.loginForm.value));
  
    this.service.login(this.loginForm.value).subscribe((res)=>{
      console.log('Respuesta del servidor al front: \n' );
      console.log(res);
      if(res.user.username!=null){
        
          const arrayAuthorities = [];
          const authorities = res.user.authorities;
          for (let i = 0; i < authorities.length; i++) {
            let authority = authorities[i].authority;
            arrayAuthorities.push(authority);
          }
          const user = {
            username: res.user.username,
            role: arrayAuthorities
          };
          
          StorageService.saveToken(res.token);
          StorageService.saveUser(user);
          console.log('Usuario del local storage: \n'+JSON.stringify(StorageService.getUser()));
          if(StorageService.isAdminLoggedIn()){
            this.router.navigateByUrl('admin/dashboard'); 
          }else if(StorageService.isCustomerLoggedIn()){
            this.router.navigateByUrl('customer/dashboard');
          }
      }else{
        console.log('Error al iniciar sesion');
      }
      
    });
    
  }
  

}
