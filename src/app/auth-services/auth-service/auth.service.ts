import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
//rxjs



const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  signup(signuprequest:any): Observable<any> {
    console.log(signuprequest);
    return this.http.post<[]>(BASE_URL + 'api/auth/signup', signuprequest);
    
  }
  login(loginrequest:any): Observable<any> {
    
     console.log(loginrequest);
    //poner { observe: 'response' } para obtener el header de la respuesta
    return this.http.post<[]>(BASE_URL + 'api/auth/login',loginrequest)
    //para ver el contenido del header donde se envia el token
    /*.pipe( 
      map(response => { //map hace que se ejecute el codigo que esta dentro de el cuando se recibe una respuesta del servidor 
        
        const tokenFromHeader = response.headers.get('Authorization');
       
        console.log(response.headers);
        
        const responseBody = response.body;
        
        // Puedes hacer cualquier otro procesamiento necesario
        console.log('Token del encabezado:', tokenFromHeader);
        console.log('Cuerpo de la respuesta:', responseBody);

        // Retornar el cuerpo de la respuesta si es necesario
        return responseBody;
      }));*/
  }
    
  
}
//para enviar las credenciales en form-data 
/*
  /*const formdata = new FormData();
    formdata.append('username', loginrequest.email);
    formdata.append('password', loginrequest.password);
    formdata.forEach((value,key) => {
      console.log(key+" "+value);
    });
    const params = new URLSearchParams();
    formdata.forEach((value, key) => {
      params.set(key, value as string);
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  private convertObjectJsonToFormData(obj: any): FormData {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value as string); // Convertimos 'value' a string
    });

    return formData;
  }*/
/*
{
    "mensaje": "Hola admin@gmail.com, has iniciado sesión con éxito!",
    "user": {
        "password": null,
        "username": "admin@gmail.com",
        "authorities": [
            {
                "authority": "ADMIN"
            }
        ],
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "enabled": true
    },
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIkFETUlOXCJ9XSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwNDM4OTg3NywiZXhwIjoxNzA0MzkxMzE3fQ.Soy19o-mRjoD34WYMf2aKQdZ3N7-pYKydj7wKyc9FB4"
}




{
    "mensaje": "Error de autenticación: username o password incorrecto!",
    "error": "Credenciales erróneas"
}
*/ 