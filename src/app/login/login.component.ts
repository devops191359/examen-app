import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  isLoggedIn=false;


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private router: Router,
    private eventBusService: EventBusService,
    private formBuilder: FormBuilder) {


    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.eventBusService.emit(new EventData("isLoggedIn", true));
          this.isLoggedIn=true;
        },
        error => {
          //this.alertService.error(error);
          this.eventBusService.emit(new EventData("isLoggedIn", false));
          this.isLoggedIn=false;
          this.loading = false;
        });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
