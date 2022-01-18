import { bookUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BookList } from '../models/GutendexryModels';
import { catchError, Observable, throwError } from 'rxjs';

const url = `${bookUrl}`
const allUrl = `${url}/books`
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

    //Get top page
    getTop(): Observable<BookList>{
      console.log(allUrl)
      return this.http.get<BookList>(allUrl)
      .pipe(catchError(this.handleError));
    }
    private handleError(httpError: HttpErrorResponse){
      if (httpError.error instanceof ErrorEvent){
        console.log('An Error occured: ', httpError.error.message);
      }else{
        console.error(`
          Backend returned code: ${httpError.status}
          Body was: ${httpError.error}
        `);
      }
      return throwError(() => new Error('Something Really Bad happened, please try again later'));
    }


}
