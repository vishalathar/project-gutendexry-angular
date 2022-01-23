import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/ClientMessage';
import { Book, BookList } from 'src/app/models/GutendexryModels';
import { BookService } from 'src/app/services/book.service';

/**
 *
 * url : /books?languages=en,fr,fi
 * url: /books?search=dickens%20great&languages=en
 *
 */


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title = `Search Books`
  public books: Book[] = [];
  public languageSelection: string = '';
  public authorSelection: string = '';
  public titleSelection: string = '';

  public clientMessage: ClientMessage = new ClientMessage('Accessing Book List');
  public bookList : BookList


  constructor(public bookService: BookService) {
    this.findFirstBooks();
  }

  ngOnInit(): void {
  }



  public searchBooks(){
    if(!!this.languageSelection){
      console.log(`${this.languageSelection}`);
    }
    else{
      this.languageSelection = "No Value";
    }
    if(!!this.authorSelection){
      console.log(`${this.authorSelection}`);
    }
    else{
      this.authorSelection = "No Value";
    }
    if(!!this.titleSelection){
      console.log(`${this.titleSelection}`);
    }
    else{
      this.titleSelection = "No Value";
    }
  }

  findFirstBooks(){
    this.bookService.getTop()
      .subscribe(data =>{
        this.bookList = data;
        console.log(this.bookList)
      })
  }

}
