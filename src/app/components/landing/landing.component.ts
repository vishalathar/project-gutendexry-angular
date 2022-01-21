import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ClientSecurityService } from 'src/app/services/client-security.service';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from "@angular/core";



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private cs_service: ClientSecurityService, private router: Router,
    private modalService: NgbModal
    ) { }

  title = "Welcome to Gutendexry";

  ngOnInit(): void {
  }

  // modify line 8 of tsconfig.json to set strict to false
  // modify line 8 of tsconfig.json to set strict to false
  username: string;
  password: string;


  doLogin() {

    // this will call a login() method from the jwtService
    // pass the username and password properties to the login() method inside the jwtService
    let resp = this.cs_service.login(this.username, this.password)

    resp.subscribe(data => {
      this.router.navigate(['/main']) // think of ways in which you would append this to the header
    },
    error => {
      //  this.closeModal = `Dismissed ${this.getDismissReason('logged in')}`;
      this.displayNone();
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

  @ViewChild("loginModal") loginModal: ElementRef;

  private displayNone(){
    console.log(this.loginModal);
    let el = this.loginModal.nativeElement;
    el.setAttribute('style', 'display: none;' );
  }
}
