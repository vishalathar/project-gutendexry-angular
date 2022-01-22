import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/GutendexryModels';
import { url } from 'src/environments/environment';

const userUrl = `${url}user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = new User(0, '', '', '', '', []);


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }


  findUserByUsername(username: string): Observable<User>{

    return this.http.get<User>(`${userUrl}/${username}`
    //,{responseType: 'text' as 'json'}
    )
    .pipe(catchError(this.handleError));
  }


  getUserProps(data: any){

    let element: any = data;
    for (let prop in element) {
    console.log(`${prop}`)
    if (prop === "firstName"){
      console.log(`prop: ${element[prop]}`)
      this.user.firstname = element[prop];
       // return element[prop];
    }
    if (prop === "lastName"){
      this.user.lastname = element[prop];
      console.log(`last name: ${this.user.lastname}`);
    }
    if (prop === "password"){
      this.user.password = element[prop];
      console.log(`password: ${this.user.password}`);
    }
    if (prop === "username"){
      this.user.username = element[prop];
      console.log(`username: ${this.user.username}`);
    }

    // need help at this point
    if (prop === "books"){
      for(let b of element[prop]){
        for (let bProp in b){
          if(bProp === "id"){
            console.log(`bProp: ${bProp}`)
            console.log(`value of id: ${b[bProp]}`)
            this.user.userbooks.push(b[bProp]);
            let index = this.user.userbooks.indexOf(b[bProp]);

            console.log(this.user.userbooks[index]);

          }
      }
    }
    }
  }
  }

  private handleError(httpError: HttpErrorResponse) {

    if (httpError.error instanceof ErrorEvent) {
      console.log('An error occurred: ', httpError.error.message)
    } else {
      console.error(`
        Backend returned code ${httpError.status},
        body was: ${httpError.error},
        ${httpError.message}
      `);
    }

    return throwError(() => new Error('Something really bad happened, please try again later'));
  }

}
