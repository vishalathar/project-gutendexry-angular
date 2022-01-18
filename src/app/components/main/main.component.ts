import { BookService } from './../../services/book.service';
import { Book, BookList } from './../../models/GutendexryModels';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/ClientMessage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  title = "Home";
  user = "";

  userFirstName = 'firstName';
  userLastName = 'lastName';
  nameOfUser = this.userFirstName + ' ' +  this.userLastName;

  public bookList!: BookList;

  public currentBook = (target:number) =>{
    return this.bookList.results[target]
  }

  public clientMessage: ClientMessage = new ClientMessage('Sorry no books found')
  ;



  constructor(private bookService: BookService) {
    this.findTopBooks()
   }

  findTopBooks(){
    this.bookService.getTop()
      .subscribe(data =>{
        this.bookList = data;
      })
      console.log(this.bookList);
  }



  ngOnInit(): void {
  }

}
