import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  title = "Home";
  user = "";

  userFirstName = 'longFirstName';
  userLastName = 'LonglastName';
  nameOfUser = this.userFirstName + ' ' +  this.userLastName;
  constructor() { }

  ngOnInit(): void {
  }

}
