/*import { AuthService } from './../../../shared/auth/auth.service';*/
import { AuthService } from './../../../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('username', [Validators.required]),
    password: new FormControl('Password', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      localStorage.removeItem('token');
      //this.authService.register(loginData);

      this.authService.login(loginData).subscribe(data => {

        if (data.status) {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('username', data.username);
          localStorage.setItem('role', data.role);
          localStorage.setItem('nom', data.nom);
          this.spinner.hide();
          this.router.navigate(["/recherche-client"]);
        }
        else{
          this.isLoginFailed = true;
          this.spinner.hide();
        }
      });


    /*this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .then((res) => {
        this.spinner.hide();
        this.router.navigate(['/recherche-client']);
      })
      .catch((err) => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: ' + err)
      }
      );*/
  }

}
