import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/GutendexryModels';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  title = 'All Books'
  public books: Book[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
