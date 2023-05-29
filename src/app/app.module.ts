import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/authguard.guard';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AuthInterceptor } from './_helpers/jwt.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { StorageService } from './_services/storage.service';
import { ProductosComponent } from './productos/productos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalRegistroComponent } from './productos/modal-registro/modal-registro.component';
import { MatCommonModule } from '@angular/material';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ModalMensajeComponent } from './productos/modal-mensaje/modal-mensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ProductosComponent,
    ModalRegistroComponent,
    ModalMensajeComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    StorageService,
    AuthGuard,
    UserService,
    DecimalPipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
