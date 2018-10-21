import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string){
    return this.http.post<any>('https://api.mika.house/login', {username: username, password: password})
      .pipe(map(success => {
        if(success && success.token){          
          localStorage.setItem('token', success.token);
        }
        return success;
      }))
  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    localStorage.removeItem('token');
  }
}
