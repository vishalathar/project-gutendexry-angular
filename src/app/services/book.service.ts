import { bookUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Book, BookList, Person } from '../models/GutendexryModels';
import { catchError, map, Observable, of, throwError } from 'rxjs';

const url = `${bookUrl}`;
const allUrl = `${url}books`;
const topicUrl = `${allUrl}?topic=`;
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  //Get first page of all API results
  getTop(): Observable<BookList> {
    return this.http.get<BookList>(allUrl).pipe(catchError(this.handleError));
  }
  //Get given page of API results
  getPage(pageUrl: string): Observable<BookList> {
    return this.http.get<BookList>(pageUrl).pipe(catchError(this.handleError));
  }
  //Get specific page of search results
  public getPageOfTopicSearch(page:number, search:string): Observable<BookList> {
    return this.http.get<BookList>(`${allUrl}/?page${page}&topic=${search}`)
  }
  getTopTopicSearchPage(search:string): Observable<BookList> {
    return this.http.get<BookList>(`${topicUrl}${search}`).pipe(catchError(this.handleError));
  }
  //Get specific Book Details by ID
  getBooksByID(ids: string): Observable<BookList> {
    console.log(`${allUrl}?ids=${ids}`)
    return this.http
      .get<BookList>(`${allUrl}?ids=${ids}`)
      .pipe(catchError(this.handleError));
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
  getBookListProp(bookList: BookList, target: string): string {
    let element: any = bookList;
    for (let prop in element) {
      if (prop === target) return element[prop];
    }
    return `${target} not found`;
  }

  getBookProp(book: Book, target: string): string {
    let element: any = book;
    for (let prop in element) {
      if (prop === target) return element[prop];
    }
    return `${target} not found`;
  }

  getPersonProp(person: Person, target: string): string {
    let element: any = person;
    for (let prop in element) {
      if (prop === target) return element[prop];
    }
    return `${target} not found`;
  }
  getBookAuthors(book: Book): Person[] {
    let results: Person[] = [];

    let authors: any = book.authors;
    for (let person in authors) {
      results.push(authors[person]);
    }
    return results;
  }

  getBookTranslators(book: Book): Person[] {
    let results: Person[] = [];

    let translators: any = book.translators;
    for (let person in translators) {
      results.push(translators[person]);
    }
    return results;
  }



}

