import { bookUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const url = `${bookUrl}`

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }
}
