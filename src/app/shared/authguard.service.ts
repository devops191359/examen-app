import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }


  isloggedIn(){
    return !!localStorage.getItem("auth-token");
  }
}
