import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';

@Component
  ({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
export class HomeComponent implements OnInit
{
  formUser: string;
  formPass: string;

  alert: string = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void
  {
  }

  async submit()
  {
    if (await this.accountService.login(this.formUser, this.formPass))
    {
      // se refresca el total de la pag para mostrar los menus etc etc
      window.location.reload();
    }
    else
    {
      this.alert = 'Wrong password or user.';
    }
  }

  getUser(): string
  {
    return localStorage.getItem('user');
  }

  /**
   * Se chequea si esta online o noa la persona.
   */
  isLogin(): boolean
  {
    return localStorage.getItem('user') != null;
    //return localStorage.getItem('user') != null;
  }
}
