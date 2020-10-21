import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private http:HttpClient) { }

  login(data):Observable<any>{
    return this.http.post(`${baseUrl}login`, data);
  }

  logout(){
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  doLoginUser(tokens: Tokens) {
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

   getIduser(){
    var token = localStorage.getItem(this.JWT_TOKEN);
    var decoded = jwtDecode(token);
    
    return (decoded['sub']);
  }
}
