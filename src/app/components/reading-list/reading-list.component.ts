import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/GutendexryModels';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {



  constructor(private bookService:
    BookService) { }

  ngOnInit(): void {
  }

  getUserList():string[]{
    let result: string[] = []
    return result
  }

}
