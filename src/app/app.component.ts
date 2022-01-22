import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public user_service: UserService){}


  getUserName():string{
    return this.user_service.user.username;
  }

  title = 'project-gutendexry';

  message = "This is my message";
}
