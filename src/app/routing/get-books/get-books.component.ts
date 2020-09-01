import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../service/books.service';
import {GenderService} from '../../service/gender.service';

declare var $: any

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
  // lista de estado de orden ASC o DESC
  ordered_item: string = '';
  ordered_action: string = '';
  // modal configs
  bookId: number;
  modalName: string;
  modalAuthor: string;
  modalStock: string;

  /**
   * Constructor
   * @param genderService 
   * @param booksService 
   */
  constructor(private genderService: GenderService, private booksService: BooksService) {}

  ngOnInit(): void
  {
    //
  }

  async setTarget(value: string)
  {
    this.books = await this.booksService.getBooksBy('gender', value);
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
      let tdGender = this.createTD(b.gender);
      let tdStock = this.createTD(b.stock);
      //let input = this.createInput(b.lended, b.id);
      let button = this.createButton(b, 'Lended');

      tr.appendChild(tdName);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdGender);
      tr.appendChild(tdStock);
      tr.appendChild(button);
      tbody.appendChild(tr);
    });
  }

  createButton(b: any, text: string)
  {
    var td = document.createElement('td');
    td.classList.add('th-td-custom');
    var btn = document.createElement('button');
    // se agregan estilo definido por bootstrap
    btn.classList.add('btn');
    if (b.stock > 0)
    {
      btn.classList.add('btn-primary');
    }
    else
    {
      btn.classList.add('btn-secondary');
      btn.setAttribute('disabled', 'true');
    }

    btn.classList.add('btn-sm');
    //btn.classList.add('btn-sm');
    // se define el atributo id para el boton
    var txt = document.createTextNode(text);
    btn.appendChild(txt);
    // se agrega el listener click con su funcion.
    btn.addEventListener("click", () => this.lended(b.id));
    td.appendChild(btn);

    return td;
  }

  private createTD(text: string)
  {
    let td = document.createElement('td')
    td.classList.add('th-td-custom');
    // texto
    let nameText = document.createTextNode(text);
    td.appendChild(nameText);

    return td;
  }

  /**
   * - Define el id del libro que se quiere prestar.
   * - Abre el modal para ingresar los datos del usuario.
   * @param id 
   */
  lended(id: number): void
  {
    this.bookId = id;

    this.books.forEach(b =>
    {
      if (b.id == id)
      {
        this.modalName = b.name;
        this.modalAuthor = b.author;
        this.modalStock = b.stock;
      }
    });
    $('#bookLended').modal('show');
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
