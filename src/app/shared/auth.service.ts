import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable, tap, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response';
import { UserDto } from '../sign-up/user-dto';
import { LoginResponseDto } from './login-response-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  }
  constructor(private http: HttpClient, private router: Router,
    public localStorage: LocalStorageService) {
  }

  signup(userDto: UserDto): Observable<any> {
    return this.http.post('http://localhost:4518/api/User/signup', userDto);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<LoginResponseDto> {
    return this.http.post<LoginResponse>('http://localhost:4518/api/User/login',
      loginRequestPayload).pipe(map(data => {
        //console.log(data);
        
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        //this.loggedIn.emit(true);
        //this.username.emit(data.username);

        return data;
      }));
  }

  getJwtToken() {   
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  refreshToken() {
    const refreshTokenPayload = {
      token: this.getJwtToken(),
      refreshToken: this.getRefreshToken()   
    }
    return this.http.post<LoginResponse>('http://localhost:4518/api/User/refreshToken',
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.http.get('http://localhost:4518/api/User/logout');
      
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.router.navigateByUrl('/login');
  }


}
