import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { url } from 'src/environments/environment'
import { User } from '../models/GutendexryModels';

@Injectable({
  providedIn: 'root'
})
export class ClientSecurityService {

  private loggedUser: string;
  private loggerUserObj: User;

  constructor(private http: HttpClient) { }
  public generateToken(request: any)  {

    // hit the /authenticate endpoint of our server
    console.log("generating token")
    // console.log(request)
    return this.http.post(`${url}authenticate`, request, {responseType: 'text' as 'json'})

  }

  // accessLogin(token) - send the request with the token TO the login() method in the server at "/"
  public accessLogin(token:string) {
    console.log("hey im in access login")

    let tokenStr = `GutendexryBearer ${token}`
    const headers = new HttpHeaders().set("Authorization", tokenStr)

    return this.http.get(url, {headers, responseType: 'text' as 'json'}) // the login() method of our spring security app returns a string!

  }

  public login(username:string, password:string) {

    let req: any = {
      "username" : username,
      "password" : password
    }

    return this.generateToken(req); // we can subscribe to this return value in the login component
  }

  public logout(){
    this.loggedUser = null;
    this.loggerUserObj = null;
    this.removeToken();
  }

  public removeToken(){

    localStorage.removeItem(`token`);
  }



}
