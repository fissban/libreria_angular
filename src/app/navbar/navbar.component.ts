import {Component, OnInit} from '@angular/core';

@Component
  ({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
export class NavbarComponent implements OnInit
{
  constructor() {}

  ngOnInit(): void
  {
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
