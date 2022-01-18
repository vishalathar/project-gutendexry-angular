export class Book{

  bookId: number = 0;
  bookTitle: string = '';
  bookSubjects: string[] = [];
  authors: Person[] = [];
  translators: Person[] = [];
  bookshelves: string[] = [];
  languages: string[] = [];
  dlCount: number = 0;

  constructor(jsonStr: string) {
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
      if(prop == 'id'){
        this.bookId = jsonObj[prop];
      } else if(prop == 'title'){
        this.bookTitle = jsonObj[prop];
      }
      else if(prop == 'subject'){
        for(let str in jsonObj[prop]){
          this.bookSubjects.push(str);
        }
      } else if(prop == 'authors'){
        let jsonPerson: any = JSON.parse(jsonObj[prop]);
        for(jsonPerson in jsonObj[prop]){
          this.authors.push(jsonPerson[prop]);
        }

      } else if(prop == 'translators'){
        let jsonPerson: any = JSON.parse(jsonObj[prop]);
        for(jsonPerson in jsonObj[prop]){
          this.translators.push(jsonPerson[prop]);
        }
      } else if(prop == 'bookshelves'){
        for(let str in jsonObj[prop]){
          this.bookshelves.push(str);
        }
      } else if(prop == 'languages'){
        for(let str in jsonObj[prop]){
          this.languages.push(str);
        }
      } else if(prop == 'count'){
        this.dlCount = jsonObj[prop];
      }
    }

  }

}

export class BookInList{

  bookId: number = 0;


  constructor(jsonStr: string) {
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
      if(prop == 'id'){
        this.bookId = jsonObj[prop];

    }

  }

}
}

export class Person{

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

export class BookList{

count: number;
next: string;
previous: string;
results: BookInList[];


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
