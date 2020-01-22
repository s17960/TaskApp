import { Component, OnInit } from '@angular/core';
import { Task } from './_models/Task';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();
  registerMode = false;

  constructor(private authService: AuthService){}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  setRegisterMode(flag: boolean){
    this.registerMode = flag;
  }
}

