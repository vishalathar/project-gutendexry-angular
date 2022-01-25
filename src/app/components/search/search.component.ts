import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/ClientMessage';
import { Book, BookList, Person, User } from 'src/app/models/GutendexryModels';
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
  public bookList : BookList
  private search: string = '';


  constructor(public bookService: BookService
    , public userService: UserService) {
  }

  ngOnInit(): void {
  }



  public searchBooks(){
    this.search = '';

    if(!!this.authorSelection){
      console.log(`${this.authorSelection}`);
      this.search = this.search.concat("search=");
      this.search = this.search.concat(this.authorSelection);
    }
    if(!!this.titleSelection){
      console.log(`${this.titleSelection}`);
      if(this.search == ''){
        this.search = this.search.concat("search=");
        this.search = this.search.concat(this.titleSelection);
      }
      else{
        this.search = this.search.concat("%2");
        this.search = this.search.concat(this.titleSelection);
      }
    }

    if(!!this.languageSelection){
      console.log(`${this.languageSelection}`);
      if(this.search == ''){
        this.search = this.search.concat("languages=");
        this.search = this.search.concat(this.languageSelection);
      }
      else{
        this.search = this.search.concat("&languages=");
        this.search = this.search.concat(this.languageSelection);
      }

    }

    console.log(`search: ${this.search}`)

    this.findFirstBooks();
  }


  findFirstBooks(){
    this.bookService.getTopSearchByUserChoice(this.search)
      .subscribe(data =>{
        this.bookList = data;
        console.log(this.bookList)
      })
  }

  nextPage(){
    this.bookService.getPage(this.bookService.getBookListProp(this.bookList, 'next'))
    .subscribe(data =>{
      console.log(data)
      this.bookList = data;

    })
   }
   previousPage(){
    this.bookService.getPage(this.bookService.getBookListProp(this.bookList, 'previous'))
    .subscribe(data =>{
      console.log(data)
      this.bookList = data;

    })
   }



  findBook(pageNum: string){
    this.bookService.getPage(pageNum)
      .subscribe(data =>{
        this.bookList = data;
        console.log(this.bookList)
      })
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



  addToReadingList(target:number){
    let user:User = this.userService.user
    this.userService.addBook(user, Number(this.bookService.getBookProp(this.bookList.results[target], 'id'))).subscribe((data) =>{
    this.userService.getUserProps(data)
    })
  }

  checkNull(prop: string){

    return this.bookService.getBookListProp(this.bookList, prop)
   }

}
