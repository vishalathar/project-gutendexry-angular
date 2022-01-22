import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientSecurityService } from 'src/app/services/client-security.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private cs_service: ClientSecurityService, private router: Router,
    public user_service: UserService) { }


  ngOnInit(): void {
  }

  doLogout(){
    console.log("logging out");
    this.cs_service.logout();
    alert("You are logged out of Gutendexry. 💔 ")
    this.router.navigate(['/login'])
  }

  getFirstName():string{
    return this.user_service.user.firstname;
  }

}
