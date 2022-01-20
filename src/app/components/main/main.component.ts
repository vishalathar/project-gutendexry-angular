import { BookService } from './../../services/book.service';
import { Book, BookList, Person } from './../../models/GutendexryModels';
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

  public clientMessage: ClientMessage = new ClientMessage('Accessing Book List');
  public bookList!: BookList;

  constructor(private bookService: BookService) {
    this.findFirstBooks()
   }

  findFirstBooks(){
    this.bookService.getTop().subscribe(data =>{this.bookList = data;console.log(this.bookList)})
  }

  public getBookId(target: number): string{
    return this.bookService.getBookProp(this.bookList.results[target], 'id')
  }
  public getBookTitle(target: number): string{
    return this.bookService.getBookProp(this.bookList.results[target], 'title')
  }
  public getBookSubjects(target: number): string{
    return this.bookService.getBookProp(this.bookList.results[target], 'subjects')
  }
  public getBookBookshelves(target: number): string{
    return this.bookService.getBookProp(this.bookList.results[target], 'bookshelves')
  }
  public getBookCount(target: number): string{
    return this.bookService.getBookProp(this.bookList.results[target], 'download_count')
  }
  public getBookLanguages(target: number): string{
    return this.bookService.getBookProp(this.bookList.results[target], 'languages')
  }
  public getBookAuthors(target: number): string[]{
    let results: string[] = []
    let authors: Person[] = this.bookService.getBookAuthors(this.bookList.results[target])
    let author: any
    authors.forEach( (author) =>{ results.push(this.bookService.getPersonProp(author, 'name'))})
    return results
    }
    public getBookTranslators(target: number): string[]{
      let results: string[] = []
      let translators: Person[] = this.bookService.getBookTranslators(this.bookList.results[target])
      let translator: any
      translators.forEach( (translator) =>{ results.push(this.bookService.getPersonProp(translator, 'name'))})
      return results
      }





  ngOnInit(): void {
  }

}
