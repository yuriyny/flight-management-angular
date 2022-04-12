import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
//import { WelcomeWindowComponent } from 'src/app/welcome-window/welcome-window.component';
//import { AuthService } from '../shared/auth.service';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  userFormControl = new FormControl('', [
    Validators.required,
    //Validators.email,
    //Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  isError!: boolean;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage!: string;

  constructor( 
    private activatedRoute: ActivatedRoute, private authService: AuthService,
    private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.isError = false;
    this.activatedRoute.url.subscribe(_url => {
      this.loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
      this.activatedRoute.queryParams
        .subscribe(params => {
          if (params?.['registered'] !== undefined && params?.['registered'] === 'true') {
            this.toastr.success('Signup Successful');
            this.registerSuccessMessage = 'Please Check your inbox for activation email '
              + 'activate your account before you Login!';
          }
        });
    });


  }

  login() {
    //this.loading = true;
    this.loginRequestPayload.username = this.loginForm.get('username')!.value.toLowerCase();
    this.loginRequestPayload.password = this.loginForm.get('password')!.value;

    this.authService.login(this.loginRequestPayload).subscribe((data) => {
      console.log(data);

      if (data.authenticationToken == null) {
        this.isError = true;
      }
       // this.loading = false;
        this.router.navigateByUrl('/home/search-flight');
        this.toastr.success('Login Successful');
    });
    //  } else {


    //     this.isError = true;
    //   }
    // }, (error: string) => {
    //   this.isError = true;
    //   this.loading = false;
    //   //this.loginForm.reset();
    //   console.log('Login Failed ' + error); 
    // });
  }




}
