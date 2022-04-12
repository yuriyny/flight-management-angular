import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';
import { MustMatch } from '../shared/must-match-validator';
import { UserDto } from './user-dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;
  userDto!: UserDto;
  matcher = new MyErrorStateMatcher();
  isError = false;
  clicked = false;

  constructor(private router: Router, private authservice: AuthService,
    private toastr: ToastrService, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    } as AbstractControlOptions);


  }

  signup() {

    // this.signupRequestPayload.username = this.signupForm.get('username')!.value.toLowerCase();
    // this.signupRequestPayload.email = this.signupForm.get('email')!.value.toLowerCase();
    // this.signupRequestPayload.password = this.signupForm.get('password')!.value;
    // console.log("---");
    // console.log(this.signupRequestPayload);
    this.userDto = {
      email: this.signupForm.get('email')!.value.toLowerCase(),
      firstName: "",
      lastName: "",
      password: this.signupForm.get('password')!.value,
      phone: 1234567890,
      username: this.signupForm.get('username')!.value.toLowerCase()
    };
    //console.log("--->>>");
    // const udto = new UserDto();
    // udto.username = this.signupForm.get('username')!.value.toLowerCase();
    // udto.email = this.signupForm.get('email')!.value.toLowerCase();
    // udto.password = this.signupForm.get('password')!.value;
    // udto.firstName = "Fname";
    // udto.lastName = "Lname"
    // udto.phone = 6311234567


    this.authservice.signup(this.userDto).subscribe(data =>{
      this.router.navigateByUrl('/login');

      
    });
      // .subscribe(() => {
      //   this.clicked = true;
      // }, () => {
      //   this.isError = true;
      //   this.toastr.error('Registration Failed! Please try again');
      // });
  }

  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      return controlInvalid;
    }
  }

}
