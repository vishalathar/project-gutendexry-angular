import { Book_BE } from './../../models/GutendexryModels';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Person, User, Book } from 'src/app/models/GutendexryModels';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css'],
})
export class ReadingListComponent implements OnInit {
  // public list: Book[];

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {}

  getUserList(): string[] {
    let result: string[] = [];
    return result;
  }

  public getBookId(target: number): string {
    return '';
  }
  public getBookTitle(target: number): string {
    return '';
  }
  public getBookSubjects(target: number): string {
    return '';
  }
  public getBookBookshelves(target: number): string {
    return '';
  }
  public getBookCount(target: number): string {
    return '';
  }
  public getBookLanguages(target: number): string {
    return '';
  }
  public getBookAuthors(target: number): string[] {
    let results: string[] = [];

    return [];
  }
  public getBookTranslators(target: number): string[] {
    let results: string[] = [];

    return results;
  }
}
