import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //esto es para que funcione el router-outlet en el app.component.html
import { Router, RouterOutlet } from '@angular/router'; // esto es para que funcione el router-outlet en el app.component.html
import { RouterModule } from '@angular/router'; //para que funcione el routerLink en el app.component.html
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StorageService } from './auth-services/storage-service/storage.service';



interface RutasObject {
  [key: string]: string[]; // Cada propiedad es una cadena con un array [string, string]
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzLayoutModule, NzButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'restaurant-angular';

  constructor(private router: Router) {
   }

  isAdminLoggedIn?:boolean;
  isCustomerLoggedIn?: boolean;
  rutasObject?: RutasObject; //aqui se pondra la ruta y el nombre de la ruta ejemplo: {"/login": "Login"}
  logoLink?: string[];
  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if(val.constructor.name == "NavigationEnd"){ // NavigationEnd es un evento que se dispara cuando se termina de cargar una ruta
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
        if(this.isAdminLoggedIn){
          this.rutasObject = {
           "Category": ["/admin/category","active"],
           
            "Dashboard": ["/admin/dashboard","active"]
            
            
          }
          this.logoLink = [ "Restaurnat System","/admin/dashboard","active" ]
        }
        if(this.isCustomerLoggedIn){
          this.rutasObject = {
            "Reservation": ["/customer/reservation","active"],
           
            "Dashboard": ["/customer/dashboard","active"]
            
          }
          this.logoLink = [ "Restaurnat System","/customer/dashboard","active" ]
        }
        if(this.isAdminLoggedIn === this.isCustomerLoggedIn){
          this.rutasObject = {
            "Login": ["/login","active"],
            "Sign up": ["/signup","active"]
          }
          this.logoLink = [ "Restaurnat System","/login","active" ]
        }
        
      }
    });
  }

  //cunado le doy al link /logout
  logout(): void{
    StorageService.signOut();
    this.router.navigateByUrl('/login');
  }
  
  
  
}
