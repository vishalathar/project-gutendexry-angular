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
      return true;
    }
    alert("You have not Logged In.")
    this.router.navigate(['login']);
    return false;
  }

}
