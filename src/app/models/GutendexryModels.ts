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
        console.log(this.bookId);
      } else if(prop == 'title'){
        this.bookTitle = jsonObj[prop];
      }
      else if(prop == 'subject'){
        for(let str in jsonObj[prop]){
          this.bookSubjects.push(str);
        }
      } else if(prop == 'authors'){
        let jsonPerson: any = JSON.parse(jsonObj[prop]);
        for(let personProp in jsonObj[prop]){
          this.authors.push(jsonPerson[personProp]);
        }

      } else if(prop == 'translators'){
        let jsonPerson: any = JSON.parse(jsonObj[prop]);
        for(let personProp in jsonObj[prop]){
          this.translators.push(jsonPerson[personProp]);
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

export class Person {
  birthYear: number = 0;
  deathYear: number = 0;
  name: string = '';

  constructor(jsonStr: string) {
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
      if (prop == 'birth_year') {
        this.birthYear = jsonObj[prop];
      } else if (prop == 'death_year') {
        this.deathYear = jsonObj[prop];
      } else if (prop == 'name') {
        this.name = jsonObj[prop];
      }
    }
  }
}

export class BookList {
  count: number = 0;
  next: string = '';
  previous: string = '';
  results: Book[] = [];

  constructor(jsonStr: string) {
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
      if (prop == 'count') {
        this.count = jsonObj[prop];
      } else if (prop == 'next') {
        this.next = jsonObj[prop];
      } else if (prop == 'previous') {
        this.previous = jsonObj[prop];
      } else if (prop == 'results') {
        let jsonBook: any = JSON.parse(jsonObj[prop]);
        for (let bookProp in jsonBook) {
          this.results.push(new Book(jsonBook[bookProp]));
        }
      }
    }
  }
}

export class Book_BE{
  bookid: number = 0;
  owners: number[] = [];

  constructor(
    bookid: number,
    owners: number[]
  ){
    this.bookid = bookid;
    this.owners = owners;
  }
}
/*
{
  "id": 3,
  "firstName": "Demo",
  "lastName": "lastd",
  "username": "username1",
  "password": "pass123",
  "books": [
      {
          "id": 1,
          "owners": [
              3
          ]
      }
  ]
}
*/
export class User {
  userid: number = 0;
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';
  userbooks: Book_BE[];

  constructor(
    userid: number,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    userbooks: any[]
  ){
    this.userid = userid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.userbooks = userbooks;
  }
}
