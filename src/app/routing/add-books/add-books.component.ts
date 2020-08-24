import {Component, OnInit} from '@angular/core';
import {GenderService} from '../../service/gender.service';
import {BooksService} from '../../service/books.service';
import {analyzeAndValidateNgModules} from '@angular/compiler';

@Component
  ({
    selector: 'app-add-books',
    templateUrl: './add-books.component.html',
    styleUrls: ['./add-books.component.css']
  })
export class AddBooksComponent implements OnInit
{
  formName: string = '';
  formAuthor: string = '';
  formLended: string = '';
  formGender: string = '';

  genders: any[] = [];

  constructor(private genderService: GenderService, private booksService: BooksService) {}

  response: number = 0;
  alert: any = '';

  async ngOnInit(): Promise<void>
  {
    // se obtienen todos los generos.
    this.genders = await this.genderService.get();
  }

  /**
   * Guarda un nuevo libro.
   */
  async saveBook()
  {
    // Se guarda el libro y se espera el status de la respuesta.
    if (this.response = await this.booksService.add(this.formName, this.formAuthor, this.formGender))
    {
      switch (this.response)
      {
        case 403:
          this.alert = 'Error 403, acceso prohibido.';
          break;
        case 200:
          this.alert = 'Se realizo con exito la carga del libro.';
          break;
      }
    }

  }
}
