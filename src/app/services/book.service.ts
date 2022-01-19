import { bookUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Book, BookList, Person } from '../models/GutendexryModels';
import { catchError, Observable, throwError } from 'rxjs';

const url = `${bookUrl}`;
const allUrl = `${url}/books`;
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  //Get top page
  getTop(): Observable<BookList> {
    console.log(allUrl);
    return this.http.get<BookList>(allUrl).pipe(catchError(this.handleError));
  }
  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      console.log('An Error occured: ', httpError.error.message);
    } else {
      console.error(`
          Backend returned code: ${httpError.status}
          Body was: ${httpError.error}
        `);
    }
    return throwError(
      () => new Error('Something Really Bad happened, please try again later')
    );
  }

  // Methods for getting specific properties from inside objects:
  // If accessing person or book objects inside a BookList feed the object into the correct method
  // e.g. getBookProp(this.bookList.result[0], 'id') to get the id property of the first book in a booklist's results.
  getBookListPrpp(bookList: BookList, target: string): string {
    let element: any = bookList;
    for (let prop in element) {
      if (prop === target) return element[prop];
    }
    return `${target} not found`;
  }

  getBookPrpp(book: Book, target: string): string {
    let element: any = book;
    for (let prop in element) {
      if (prop === target) return element[prop];
    }
    return `${target} not found`;
  }

  getPersonPrpp(person: Person, target: string): string {
    let element: any = person;
    for (let prop in element) {
      if (prop === target) return element[prop];
    }
    return `${target} not found`;
  }
}
