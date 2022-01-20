import { BookService } from './../../services/book.service';
import { Component } from '@angular/core';
import { Book, BookList, Person } from 'src/app/models/GutendexryModels';


@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent {

  public book: BookList[] = []
  public selection: string =''
  show = false

  private self = this

  constructor(private bookService: BookService ) { }

  public findBookByCatagory(){
    let targetCatagory = this.selection
    this.show=true
    this.book.pop()
    let bookArray:string[]
     this.bookService.parseBookListForId(targetCatagory).subscribe(data =>{
       bookArray = data
       let target = this.getRandomInt(0, bookArray.length)

    this.bookService.getBook(target)
    .subscribe(data =>{
      console.log(data)
      console.log(this.book.push(data));
      this.show=false

    })
     })



  }



  public findAnyBook(){
    this.show=true
    this.book.pop()

    let target = this.getRandomInt(0, 67098)
    console.log(target)
    this.bookService.getBook(target)
    .subscribe(data =>{
      console.log(data)
      console.log(this.book.push(data));
      this.show=false
    })
  }

  // public randomBookByTarget(catagorySearch:string){
  //   this.show=true
  //   this.book.pop()


  //   let bookArray:string[] = this.bookService.parseBookListForId(catagorySearch)

  //   let target = this.getRandomInt(0, bookArray.length)
  //   console.log(target)

  //   this.bookService.getBook(target)
  //   .subscribe(data =>{
  //     console.log(data)
  //     console.log(this.book.push(data));
  //     this.show=false

  //   })
  // }
    private getRandomInt(min:number, max:number) : number{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    public getBookId(): string{
      return this.bookService.getBookProp(this.book[0].results[0], 'id')
    }
    public getBookTitle(): string{
      return this.bookService.getBookProp(this.book[0].results[0], 'title')
    }
    public getBookSubjects(): string{
      return this.bookService.getBookProp(this.book[0].results[0], 'subjects')
    }
    public getBookBookshelves(): string{
      return this.bookService.getBookProp(this.book[0].results[0], 'bookshelves')
    }
    public getBookCount(): string{
      return this.bookService.getBookProp(this.book[0].results[0], 'download_count')
    }
    public getBookLanguages(): string{
      return this.bookService.getBookProp(this.book[0].results[0], 'languages')
    }
    public getBookAuthors(): string[]{
      let results: string[] = []
      let authors: Person[] = this.bookService.getBookAuthors(this.book[0].results[0])
      let author: any
      authors.forEach( (author) =>{ results.push(this.bookService.getPersonProp(author, 'name'))})
      return results
      }
      public getBookTranslators(): string[]{
        let results: string[] = []
        let translators: Person[] = this.bookService.getBookTranslators(this.book[0].results[0])
        let translator: any
        translators.forEach( (translator) =>{ results.push(this.bookService.getPersonProp(translator, 'name'))})
        return results
        }

        close() {
          this.show = false;
        }


}





