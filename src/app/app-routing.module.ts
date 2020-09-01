import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './routing/home/home.component';
import {GetBooksComponent} from './routing/get-books/get-books.component';
import {AddBooksComponent} from './routing/add-books/add-books.component';
import {AddUserComponent} from './routing/add-user/add-user.component'
import {PageNotFoundComponent} from './routing/page-not-found/page-not-found.component';
import {AllUserComponent} from './routing/all-user/all-user.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes =
  [
    // public
    {path: '', component: HomeComponent},
    // protected
    {path: 'get', canActivate: [AuthGuard], component: GetBooksComponent, },
    {path: 'add', canActivate: [AuthGuard], component: AddBooksComponent, },
    {path: 'adduser', canActivate: [AuthGuard], component: AddUserComponent}, 
    {path: 'alluser', canActivate: [AuthGuard], component: AllUserComponent},
    // invalid
    {path: '**', component: PageNotFoundComponent, },
  ];

@NgModule
  ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}
