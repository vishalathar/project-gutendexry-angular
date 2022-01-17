export class Book{

  bookId: number;
  bookTitle: string;
  bookSubjects: string[];
  authors: any[];
  translators: any[];
  bookshelves: string[];
  languages: string[];
  dlCount: number;

  constructor(

    bookId: number,
    bookTitle: string,
    bookSubjects: string[],
    authors: any[],
    translators: any[],
    bookshelves: string[],
    languages: string[],
    dlCount: number

  ) {

    this.bookId = bookId
    this.bookTitle = bookTitle
    this.bookSubjects = bookSubjects
    this.authors = authors
    this.translators = translators
    this.bookshelves = bookshelves
    this.languages = languages
    this.dlCount = dlCount

  }

}

export class person{

birthYear: number;
deathYear: number;
name: string;

constructor(

  birthYear: number,
  deathYear: number,
  name: string
  )
  {
    this.birthYear = birthYear
    this.deathYear = deathYear
    this.name = name
  }


}

export class bookList{

count: number;
next: string;
previous: string;
results: Book[];

constructor(
  count: number,
  next: string,
  previous: string,
  results: Book[]
){
  this.count = count
  this.next = next
  this.previous = previous
  this.results = results
}


}
