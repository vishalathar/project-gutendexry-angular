import { UserService } from 'src/app/services/user.service';
import { BookList, Book_BE } from './../../models/GutendexryModels';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Person, User, Book } from 'src/app/models/GutendexryModels';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css'],
})
export class ReadingListComponent implements OnInit {
  private userBooks: Book_BE[]
  public books: Book[]
  public show = false

  constructor(private bookService: BookService, private userService: UserService) {
    this.userBooks = this.getUserList()
    this.getBooks()
  }
  getBooks(){
    this.show = true;
    this.books= [];

    let targets:number[] =[]
    for(let b of this.userBooks){
        targets.push(b.bookid)
      }
      let targetString:string = targets.join().toString()
      console.log(targetString)
      this.bookService.getBooksByID(targetString).subscribe((data) => {
        let list:BookList = data
        let results:Book[] = list.results
        for(let b of results)
        this.books.push(b);
        this.show = false;
      });

  }

  ngOnInit(): void {}

  getUserList(): Book_BE[] {
    let result: Book_BE[] = [];
    for(let b of this.userService.user.userbooks){
      result.push(b)
    }

    return result;
  }

  public getBookProps(target: number, prop:string): string {
    switch(prop){
      case 'id':
        return this.books[target].bookId.toString();
      case 'subject':
        return this.books[target].bookSubjects.toString();
      case 'title':
        return this.books[target].bookTitle.toString();
      case 'count':
        return this.books[target].dlCount.toString();
      case 'languages':
        return this.books[target].languages.toString();
      case 'bookshelves':
        return this.books[target].bookshelves.toString();
      case 'authors':
        return this.books[target].authors.join(", ");
      case 'translators':
        return this.books[target].translators.join(", ");
    }
    return 'failed to find property'
  }

}
