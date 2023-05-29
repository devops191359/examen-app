import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    console.log(JSON.parse(JSON.stringify(user)))
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(JSON.stringify(user));
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem("auth-token");
    if (user) {
      return true;
    }

    return false;
  }
}
