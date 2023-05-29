import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Login } from '../model/login.model';
import { environment } from 'src/environments/environment';
import { ResponseLoginModel } from '../model/responselogin.model';
import { Router } from '@angular/router';


const AUTH_API = 'http://localhost:10443/mso-prueba/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string) {
    return this.http.post<ResponseLoginModel>(`${environment.apiUrl}/auth/login`, { username: username, password: password },
      { observe: 'response' })
      .pipe(map(resp => {
        console.log(resp);
        console.log(resp.body?.resultado.access_token);

        resp.headers.set('Authorization', 'Bearer ' + resp.body?.resultado.access_token);
        // login successful if there's a jwt token in the response
        if (resp.body?.resultado.access_token) {
          const jwt = resp.body?.resultado.access_token || '';
          // store user details and jwt token in local storage to keep user logged in between page refreshesact_ru_task
          window.sessionStorage.setItem('auth-token', jwt);
        }
        return resp.headers.get('Authorization');
      }));
  }

  logout() {
    // remove user from local storage to log user out
    window.sessionStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
    //window.sessionStorage.removeItem('usuarioActual')
  }

  getJWTKey() { }

  isloggedIn() {
    return !!window.sessionStorage.getItem("auth-token");
  }
}
