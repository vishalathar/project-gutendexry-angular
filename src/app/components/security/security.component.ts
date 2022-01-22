import { Component, OnInit } from '@angular/core';
import { ClientSecurityService } from 'src/app/services/client-security.service';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  authRequest: any = {
    "username" : "vishal",
   "password" : "pass123"
   }

  response: any;
  constructor(private c_security: ClientSecurityService) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
  }


  // this will generate the token based on the authrequest object sent thru
  public getAccessToken(authRequest: any) {

    let resp =  this.c_security.generateToken(authRequest);
    console.log("HERE ")
    resp.subscribe(data =>
      {
        console.log(data);
        this.accessApi(data);
      },
        error => console.log(error));
  }


  public accessApi(token: any) {

    let resp = this.c_security.accessLogin(token);
    resp.subscribe(data => this.response = data); // the string returned from the controller's login() method "You're logged in!"
  }
}
