import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {GetBooksComponent} from './routing/get-books/get-books.component';
import {AddBooksComponent} from './routing/add-books/add-books.component';
import {from} from 'rxjs';

const routes: Routes =
  [
    {path: '', component: GetBooksComponent}, // index - get book list
    {path: 'add', component: AddBooksComponent} // add new book
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
