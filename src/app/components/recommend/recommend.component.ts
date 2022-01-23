import { BookService } from './../../services/book.service';
import { Component } from '@angular/core';
import { Book, BookList, Person } from 'src/app/models/GutendexryModels';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
})
export class RecommendComponent {
  public book: Book[] = [];
  public selection: string = '';
  show = false;
  public bookList!: BookList;
  constructor(private bookService: BookService) {
    this.findFirstBooks()
  }



  findFirstBooks(){
    this.bookService.getTop().subscribe(data =>{this.bookList = data})
  }

  public findBookByCatagory() {
    let targetCatagory = this.selection;
    this.show = true;
    this.book.pop();

    this.bookService.getTopTopicSearchPage(targetCatagory).subscribe((data) => {
      let page = data
      let targetBookInOrder = this.getRandomInt(0, Number(page.count))
      let targetPage = (targetBookInOrder/32)
      let targetBook = (targetBookInOrder%32)
      this.bookService.getPageOfTopicSearch(Math.floor(targetPage), targetCatagory).subscribe((data) => {
        let list:BookList = data

        let results:Book[] = list.results

        this.book.push(results[targetBook]);
        this.show = false;
      });
    });
  }

  getBookListProp(bookList: BookList, target: string): string {
    let element: any = bookList;
    for (let prop in element) {
      if (prop === target) return element[prop];
    }
    return `${target} not found`;
  }

  public findAnyBook() {
    this.show = true;
    this.book= [];

    let target = this.getRandomInt(0, this.bookList.count);
    this.bookService.getBooksByID(target.toString()).subscribe((data) => {
      let list:BookList = data
      let results:Book[] = list.results
      this.book.push(results[0]);
      this.show = false;
    });
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public getBookId(): string {
    return this.bookService.getBookProp(this.book[0], 'id');
  }

  public getBookTitle(): string {
    return this.bookService.getBookProp(this.book[0], 'title');
  }

  public getBookSubjects(): string {
    return this.bookService.getBookProp(this.book[0], 'subjects');
  }

  public getBookBookshelves(): string {
    return this.bookService.getBookProp(this.book[0], 'bookshelves');
  }

  public getBookCount(): string {
    return this.bookService.getBookProp(
      this.book[0],
      'download_count'
    );
  }

  public getBookLanguages(): string {
    return this.bookService.getBookProp(this.book[0], 'languages');
  }

  public getBookAuthors(): string[] {
    let results: string[] = [];
    let authors: Person[] = this.bookService.getBookAuthors(
      this.book[0]
    );
    let author: any;
    authors.forEach((author) => {
      results.push(this.bookService.getPersonProp(author, 'name'));
    });
    return results;
  }

  public getBookTranslators(): string[] {
    let results: string[] = [];
    let translators: Person[] = this.bookService.getBookTranslators(
      this.book[0]
    );
    let translator: any;
    translators.forEach((translator) => {
      results.push(this.bookService.getPersonProp(translator, 'name'));
    });
    return results;
  }

  close() {
    this.show = false;
  }

}
