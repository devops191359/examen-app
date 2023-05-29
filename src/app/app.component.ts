import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { TokenStorageService } from './_services/token-storage.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserService } from './_services/user.service';
import { UsuarioModel } from './model/usuario.model';
import { EventData } from './_shared/event.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  loading: boolean = false;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: TokenStorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
    private userService: UserService
  ) {


    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    })
  }

  ngOnInit(): void {

    this.eventBusSub = this.eventBusService.on("isLoggedIn", (data: boolean) => {this.isLoggedIn=data});
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userService.getByJWT().subscribe({
        next: data => {
          const resultadoJSON:UsuarioModel = data.resultado;



          if (resultadoJSON) {
            this.eventBusService.emit(new EventData("userInfo",resultadoJSON));
            this.username = resultadoJSON.username
          }
        },
        error: err => {
          if (err.error) {

            try {
              const res = JSON.parse(err.error);
              console.log(err)
              //this.content = res.message;
            } catch {
              //this.content = `Error with status: ${err.status} - ${err.statusText}`;
            }
          } else {
           // this.content = `Error with status: ${err.status}`;
          }
        }
      });

      console.log('roles : ' + this.roles)
      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    }


  }

}
