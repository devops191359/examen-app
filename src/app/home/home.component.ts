import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UsuarioModel } from '../model/usuario.model';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: Object;
  isLoggedIn=false;
   isCollapsed = true;
  usuario: UsuarioModel;
  eventBusSub?: Subscription;

  username:string='';

  constructor(private userService: UserService, private authService: AuthService, private eventBusService: EventBusService) { 
    this.usuario= new UsuarioModel();
  }

  ngOnInit(): void {
    this.userService.getByJWT().subscribe({
      next: data => {
        const resultadoJSON:UsuarioModel=data.resultado;

        if (resultadoJSON) {
          this.eventBusService.emit(new EventData("userInfo",resultadoJSON));
          this.username = resultadoJSON.username
        }
        this.usuario.username=resultadoJSON.username;
        this.username=this.usuario.username;
      },
      error: err => {
        if (err.error) {

          try {
            const res = JSON.parse(err.error);
            console.log(err)
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
