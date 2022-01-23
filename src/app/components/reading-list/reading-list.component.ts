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

    this.getBooks()
  }
  getBooks(){
    this.userBooks = this.getUserList()
    // this.show = true;
    this.books= [];
    console.log('building the book list')
    let targets:number[] =[]
    // console.log(this.userBooks)
    for(let b in this.userBooks){
      let a = Number(this.userBooks[b])
      console.log(`${a}`)
      targets.push(a);
      }
      let targetString:string = targets.join().toString()
      console.log(targetString)
      this.bookService.getBooksByID(targetString).subscribe((data) => {
        console.log(data)
        let list:BookList = data
        for(let b of list.results){
        this.books.push(b);
      }
        // this.show = false;
      });
  }

  ngOnInit(): void {}

  getUserList(): Book_BE[] {
    console.log('get user list method')
    let result: Book_BE[] = [];
    for(let b of this.userService.user.userbooks){

      console.log(b)
      result.push(b)
    }

    return result;
  }

  removeBook(bookNumber: number){
    console.log('attempting to remove')
    let id:string = this.bookService.getBookProp(this.books[bookNumber], 'id')
    let user:User = this.userService.user
    console.log(id)
    console.log('from')
    console.log(user)
    this.userService.removeBookFromList(user, id).subscribe((data) => {
      console.log(data)
      this.userService.getUserProps(data)

      this.getBooks()
    });
  }

  // public getBookProps(target: number, prop:string): string {
  //   console.log('printing property')
  //   switch(prop){
  //     case 'id':
  //       return this.bookService.getBookProp(this.books[target], 'bookId');
  //     case 'subject':
  //       return this.bookService.getBookProp(this.books[target], 'bookSubjects');
  //     case 'title':
  //       return this.bookService.getBookProp(this.books[target], 'bookTitle');
  //     case 'count':
  //       return this.bookService.getBookProp(this.books[target], 'dlCount');
  //     case 'languages':
  //       return this.bookService.getBookProp(this.books[target], 'languages');
  //     case 'bookshelves':
  //       return this.bookService.getBookProp(this.books[target], 'bookshelves');
  //     case 'authors':
  //       return this.bookService.getBookProp(this.books[target], 'authors');
  //     case 'translators':
  //       return this.bookService.getBookProp(this.books[target], 'translators');
  //   }
  //   return 'failed to find property'
  // }


  public getBookId(target: number): string{
    return this.bookService.getBookProp(this.books[target], 'id')
  }
  public getBookTitle(target: number): string{
    return this.bookService.getBookProp(this.books[target], 'title')
  }
  public getBookSubjects(target: number): string{
    return this.bookService.getBookProp(this.books[target], 'subjects')
  }
  public getBookBookshelves(target: number): string{
    return this.bookService.getBookProp(this.books[target], 'bookshelves')
  }
  public getBookCount(target: number): string{
    return this.bookService.getBookProp(this.books[target], 'download_count')
  }
  public getBookLanguages(target: number): string{
    return this.bookService.getBookProp(this.books[target], 'languages')
  }
  public getBookAuthors(target: number): string[]{
    let results: string[] = []
    let authors: Person[] = this.bookService.getBookAuthors(this.books[target])
    let author: any
    authors.forEach( (author) =>{ results.push(this.bookService.getPersonProp(author, 'name'))})
    return results
    }
    public getBookTranslators(target: number): string[]{
      let results: string[] = []
      let translators: Person[] = this.bookService.getBookTranslators(this.books[target])
      let translator: any
      translators.forEach( (translator) =>{ results.push(this.bookService.getPersonProp(translator, 'name'))})
      return results
      }


}
