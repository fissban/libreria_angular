import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{
  constructor() {}

  canActivate(): boolean
  {
    return this.checkLogin();
  }

  checkLogin(): boolean
  {
    if (localStorage.getItem('user') != undefined && localStorage.getItem('user') != null)
    {
      return true;
    }

    return false;
  }
}
