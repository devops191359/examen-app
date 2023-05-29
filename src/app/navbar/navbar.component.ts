import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { EventBusService } from '../_shared/event-bus.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsuarioModel } from '../model/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;
  eventBusSub?: Subscription;
  isLoggedIn=false;
  username:string="";
  nombreCompleto="";


  constructor(private storageService: TokenStorageService,
    private authService: AuthService,
    private eventBusService: EventBusService ) { this.isLoggedIn = this.storageService.isLoggedIn();}

  ngOnInit(): void {

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
    this.eventBusSub = this.eventBusService.on("userInfo", (data: UsuarioModel) => {
      if (data) {
        this.isLoggedIn=true
        console.log('usuario bus : '+data)
        this.username=data.username
        this.nombreCompleto=data.firstname+" "+data.lastname
      }
    });
  }



  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout(): void {
    this.authService.logout();
  }

  idLoggedIn(){
    this.storageService.isLoggedIn();
  }

}
