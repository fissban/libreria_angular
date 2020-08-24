import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../service/books.service';

@Component
  ({
    selector: 'app-get-books',
    templateUrl: './get-books.component.html',
    styleUrls: ['./get-books.component.css']
  })
export class GetBooksComponent implements OnInit
{
  books: any[] = [];

  constructor(private booksService: BooksService) {}

  async ngOnInit(): Promise<void>
  {
    // se lee desde el servidor la lista de libros.
    this.books = await this.booksService.get();
  }

  /**
   * Cambia el estado 'lended' de un libro en la base de datos.
   * @param id 
   */
  lended(id: string)
  {
    // se asigno un id al input para poder obtener su valor.
    let lended: string = (<HTMLInputElement>document.getElementById(id)).value;
    this.booksService.lended(id, lended);
  }
}
