import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService,
              private router : Router){

  }

  canActivate() {
    if(this.auth.IsLoggedIn()){
      console.log("is logging in")
      return true;
    }
    alert("You have not Logged In.")
    console.log(" not logged in")
    this.router.navigate(['login']);
    return false;
  }

}
