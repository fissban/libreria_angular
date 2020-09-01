import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
@Component
  ({
    selector: 'app-all-user',
    templateUrl: './all-user.component.html',
    styleUrls: ['./all-user.component.css']
  })
export class AllUserComponent implements OnInit
{
  allAccounts: any[];
  page: number = 1;

  constructor(private accountService: AccountService) {}

  async ngOnInit(): Promise<void>
  {
    let result: any = await this.accountService.allUser(this.page);

    this.allAccounts = result.data;
  }

  setPage(value: number)
  {
    this.page = value;
  }

  generateTable()
  {
    let tbody = document.getElementById('tbody-user');

    // en caso de ya tener contenido la tabla se limpia su contenido.
    while (tbody.hasChildNodes())
    {
      tbody.removeChild(tbody.firstChild);
    }

    this.allAccounts.forEach(account =>
    {
      // tr
      let tr = document.createElement('tr');
      // td
      let tdName = this.createTD(account.fullName);
      let tdEmail = this.createTD(account.email);
      let tdPhone = this.createTD(account.phone);
      let tdState = this.createTD(account.state);
      let tdCity = this.createTD(account.city);
      let tdAddress = this.createTD(account.address);
      let tdDni = this.createTD(account.dni);
      let tdButton = this.createButton(account.id, 'Modify');

      tr.appendChild(tdName);
      tr.appendChild(tdEmail);
      tr.appendChild(tdPhone);
      tr.appendChild(tdState);
      tr.appendChild(tdCity);
      tr.appendChild(tdAddress);
      tr.appendChild(tdDni);
      tr.appendChild(tdButton);
      tbody.appendChild(tr);
    });
  }

  createButton(id: string, text: string)
  {
    var td = document.createElement('td');
    td.classList.add('th-td-custom');
    var btn = document.createElement('button');
    // se agregan estilo definido por bootstrap
    btn.classList.add('btn');
    btn.classList.add('btn-primary');
    btn.classList.add('btn-sm');
    //btn.classList.add('btn-sm');
    // se define el atributo id para el boton
    var txt = document.createTextNode(text);
    btn.appendChild(txt);
    // se agrega el listener click con su funcion.
    btn.addEventListener("click", () => console.log('modificar'));
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
}
