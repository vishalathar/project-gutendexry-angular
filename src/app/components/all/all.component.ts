import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Book, BookList, Person, User } from './../../models/GutendexryModels';
import { BookService } from './../../services/book.service';
import { ClientMessage } from 'src/app/models/ClientMessage';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  title = 'All Books'
  public books: Book[] = [];

  public clientMessage: ClientMessage = new ClientMessage('Accessing Book List');
  public bookList!: BookList







  constructor(public bookService: BookService, private userService: UserService) {
    this.findFirstBooks()
   }

   checkNull(prop: string){

    return this.bookService.getBookListProp(this.bookList, prop)
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

  findFirstBooks(){
    this.bookService.getTop()
      .subscribe(data =>{
        this.bookList = data;
        console.log(this.bookList)
      })
  }
  findLastBooks(){
    this.bookService.getPage('https://gutendex.com/books/?page=2097')
      .subscribe(data =>{
        this.bookList = data;
        console.log(this.bookList)
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


      addToReadingList(){
        let user:User = this.userService.user
        this.userService.addBook(user, Number(this.bookService.getBookProp(this.books[0], 'id'))).subscribe((data) =>{
          this.userService.getUserProps(data)
        }
        )
      }


  ngOnInit(): void {
  }

}
