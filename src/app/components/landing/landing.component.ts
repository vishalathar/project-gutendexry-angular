import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ClientSecurityService } from 'src/app/services/client-security.service';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/GutendexryModels';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public username: string;
  public password: string;
  public firstname: string;
  public lastname: string;

  constructor(private cs_service: ClientSecurityService, private router: Router,
    private modalService: NgbModal, private user_service: UserService
    ) { }

  title = "Welcome to Gutendexry";


  ngOnInit(): void {
  }


  doLogin() {

    // this will call a login() method from the jwtService
    // pass the username and password properties to the login() method inside the jwtService
    let resp = this.cs_service.login(this.username, this.password)

    resp.subscribe(data => {

      console.log(`data: ${data}`)
      localStorage.setItem(`token`, `${data}`)
      //this.triggerLoginModalDismiss()
      let resp2 =  this.user_service.findUserByUsername(this.username)
      resp2.subscribe(data =>{
        (        data: User) =>
        console.log(`data : ${data}`)
        this.user_service.getUserProps(data);
        console.log(`firstname:  ${this.user_service.user.firstname}`)
      },
      error =>{
        console.log(`error`)
      })
      this.router.navigate(['/main'])

    },
    error => {
      alert("Wrong username/password. Try Again.")
      this.router.navigate(['/login'])
    })
  }

  doLogout() {
    let resp = this.cs_service.logout();
  }



  doSignup() {

    // this will call a login() method from the jwtService
    // pass the username and password properties to the login() method inside the jwtService
    let resp = this.cs_service.login("vishal", "pass123")

   // let resp1 = this.cs_service.signup("vishal","pass123");
    //let resp1 = this.cs_service.signup(this.firstname, this.lastname, this.username, this.password);


    resp.subscribe(data => {

      console.log(`data: ${data}`)
      localStorage.setItem(`token`, `${data}`)
      //this.triggerLoginModalDismiss()
      let resp2 =  this.user_service.addUser(this.firstname, this.lastname, this.username, this.password);

      resp.subscribe(data =>{
        (        data: User) =>
        console.log(`data : ${data}`)
        //this.user_service.getUserProps(data);
        //console.log(`firstname:  ${this.user_service.user.firstname}`)
      },
      error =>{
        console.log(`error`)
      })
      this.router.navigate(['/main'])

    },
    error => {
      alert("Wrong username/password. Try Again.")
      this.router.navigate(['/login'])
    })
  }



  // all methods for modals toggling
  closeModal!: string;
  triggerLoginModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  triggerSignupModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /// modal dissmising try


//  @ViewChild("loginModal") loginModal: ElementRef;

//   private displayNone(){
//     console.log(this.loginModal);
//     let el = this.loginModal.nativeElement;
//     el.setAttribute('style', 'display: none;  ' );
//   }


}
