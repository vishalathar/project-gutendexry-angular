import { UserService } from 'src/app/services/user.service';
import { BookService } from './../../services/book.service';
import { Book, BookList, Person, User } from './../../models/GutendexryModels';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientMessage } from 'src/app/models/ClientMessage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .card.disabled {
      opacity: 0.5;
    }
  `]
})
export class MainComponent implements OnInit {

  disabled = false;
  title = "Home";
  user = "";

  userFirstName = 'firstName';
  userLastName = 'lastName';


  public clientMessage: ClientMessage = new ClientMessage('Accessing Book List');
  public bookList!: BookList;

  constructor(private bookService: BookService, private userService: UserService) {
    this.findFirstBooks()
   }
  findFirstNameOfUser():string {
    return this.userService.user.firstname;
  }
  findLastNameOfUser():string {
    return this.userService.user.lastname
  }

  findFirstBooks(){
    this.bookService.getTop().subscribe(data =>{this.bookList = data;console.log(this.bookList)})
  }

  addToReadingList(target:number){
    let user:User = this.userService.user
    this.userService.addBook(user, Number(this.bookService.getBookProp(this.bookList.results[target], 'id'))).subscribe((data) =>{
      this.userService.getUserProps(data)
    }
    )
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

