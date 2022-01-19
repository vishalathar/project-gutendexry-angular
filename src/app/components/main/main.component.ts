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

  public clientMessage: ClientMessage = new ClientMessage('sorry Book not found');
  public bookList!: BookList;






  constructor(private bookService: BookService) {
    this.findFirstBooks()
   }

  findFirstBooks(){
    this.bookService.getTop()
      .subscribe(data =>{
        this.bookList = data;
        console.log(this.bookList)
      })
  }

  public getBookId(target: number): string{
    return this.bookService.getBookPrpp(this.bookList.results[target], 'id')
  }
  public getBookTitle(target: number): string{
    return this.bookService.getBookPrpp(this.bookList.results[target], 'title')
  }



  ngOnInit(): void {
  }

}
