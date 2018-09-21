import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserDetails(username: String, password: String){
    return this.http.post('/api/', {
      username, password
    }).subscribe(data => {
      console.log(data);
    });
  }
}
