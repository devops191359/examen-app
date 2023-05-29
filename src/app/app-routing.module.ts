import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/authguard.guard';
import { ProductosComponent } from './productos/productos.component';
import { DelayResolver } from './_helpers/_resolver/delay-resolver';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard], resolve: { data: DelayResolver } },
  { path: 'login', component: LoginComponent ,resolve: { data: DelayResolver } },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard],resolve: { data: DelayResolver } },
  { path: '', redirectTo: 'login', pathMatch: 'full' , resolve: { data: DelayResolver }},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
