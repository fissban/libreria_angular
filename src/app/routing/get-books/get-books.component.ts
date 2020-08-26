import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../service/books.service';
import {GenderService} from '../../service/gender.service';

@Component
  ({
    selector: 'app-get-books',
    templateUrl: './get-books.component.html',
    styleUrls: ['./get-books.component.css']
  })
export class GetBooksComponent implements OnInit
{
  // lista de libros
  books: any[] = [];
  // lista de generos
  genders: any[] = [];
  // lista de estado de orden ASC o DESC
  ordered_item: string = '';
  ordered_action: string = '';

  /**
   * Constructor
   * @param genderService 
   * @param booksService 
   */
  constructor(private genderService: GenderService, private booksService: BooksService) {}

  async ngOnInit(): Promise<void>
  {
    // se lee desde el servidor la lista de libros.
    this.books = await this.booksService.get();
    // se lee todos los generos.
    this.genders = await this.genderService.get();
    // se genera la estructura del tbody con la lista de libros.
    this.generateTableData();
  }

  /**
   * Se genera la estructura de tablas.
   * - Los elementos son creados como elementos del DOM y se anexan al mismo.
   * - Se realizaa de esta manera y no con un *ngFor ya que nos permite volver a 
   *   rediseñar la tabla en caso de querer ordenarla ASC o DESC.
   */
  generateTableData()
  {
    let tbody = document.getElementById('tbody-list');

    // en caso de ya tener contenido la tabla se limpia su contenido.
    while (tbody.hasChildNodes())
    {
      tbody.removeChild(tbody.firstChild);
    }

    // se genera estructura de tablas.
    this.books.forEach(b =>
    {
      // tr
      let tr = document.createElement('tr');
      // td
      let tdName = this.createTD(b.name);
      let tdAuthor = this.createTD(b.author);
      let tdGender = this.createTD(this.getGenderById(b.gender));
      let input = this.createInput(b.lended, b.id);
      let button = this.createButton(b, 'Update');

      tr.appendChild(tdName);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdGender);
      tr.appendChild(input);
      tr.appendChild(button);
      tbody.appendChild(tr);
    });
  }

  createButton(b: any, text: string)
  {
    var td = document.createElement('td');
    var btn = document.createElement('button');
    // se agregan estilo definido por bootstrap
    btn.classList.add('btn');
    btn.classList.add('btn-primary');
    // se define el atributo id para el boton
    var txt = document.createTextNode(text);
    btn.appendChild(txt);
    // se agrega el listener click con su funcion.
    btn.addEventListener("click", () =>
    {
      let lended: string = (<HTMLInputElement>document.getElementById(b.id)).value;
      this.booksService.lended(b.id, lended);
    });
    td.appendChild(btn);

    return td;
  }

  private createInput(text: string, id: any)
  {
    let td = document.createElement('td')
    let input = document.createElement('input');
    // se aplica el class indicado por bootstrap
    input.classList.add('form-control');
    // type generico para los de tipo texto
    input.setAttribute('type', 'text');
    // texto
    input.setAttribute('value', text);
    input.setAttribute('id', id);
    td.appendChild(input);

    return td;
  }

  private createTD(text: string)
  {
    let td = document.createElement('td')
    // texto
    let nameText = document.createTextNode(text);
    td.appendChild(nameText);

    return td;
  }

  /**
   * Cambia el estado 'lended' de un libro en la base de datos.
   * @param id 
   */
  lended(id: string): void
  {
    // se asigno un id al input para poder obtener su valor.
    let lended: string = (<HTMLInputElement>document.getElementById(id)).value;
    this.booksService.lended(id, lended);
  }

  /**
   * Se obtiene el nombre de un genero de acuerdo a su ID.
   * @param value string
   */
  getGenderById(value: string): string
  {
    let aux: string = 'none';
    this.genders.forEach(g =>
    {
      if (g.id == value)
      {
        aux = g.name;
      }
    });

    return aux;
  }

  /**
   * Se ordena la tabla de acuerdo a un tipo de form ASC o DESC
   * - Se usa 'ordered_item' para conocer cual fue el ultimo item en ser ordenado.
   * - Se usa 'ordered_action' para conocer la ultima accion realizada sobre un item.
   * @param p_key 
   */
  orderedTable(p_key: string)
  {
    // Se ordena la tabla segun el ultimo pedido y su accion
    if (this.ordered_item == p_key)
    {
      if (this.ordered_action == 'ASC')
      {
        this.ordenarDesc(p_key);
        this.ordered_action = 'DESC';
      }
      else
      {
        this.ordenarAsc(p_key);
        this.ordered_action = 'ASC';
      }

    }
    else
    {
      this.ordenarAsc(p_key);
      this.ordered_action = 'ASC';
      this.ordered_item = p_key;
    }
  }
  /**
   * Se ordena un json de forma ASC
   * - Source:https://fernando-gaitan.com.ar/ordenar-y-desordenar-un-array-de-json-en-javascript/
   * - TODO se podria mejorar dejando un solo metodo pero... :P
   * @param p_array_json 
   * @param p_key 
   */
  private ordenarAsc(p_key: string): any
  {
    this.books.sort(function (a, b)
    {
      if (a[p_key] > b[p_key])
      {
        return 1;
      }
      if (a[p_key] < b[p_key])
      {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    this.generateTableData();
  }

  /**
  * Se ordena un json de forma DESC
  * - Source:https://fernando-gaitan.com.ar/ordenar-y-desordenar-un-array-de-json-en-javascript/
  * @param p_array_json
  * @param p_key
  */
  private ordenarDesc(p_key: string): any
  {
    this.books.sort(function (a, b)
    {
      if (a[p_key] > b[p_key])
      {
        return -1;
      }
      if (a[p_key] < b[p_key])
      {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    this.generateTableData();
  }
}
