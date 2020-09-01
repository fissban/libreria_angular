import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {GetBooksComponent} from './routing/get-books/get-books.component';
import {AddBooksComponent} from './routing/add-books/add-books.component';
import {HomeComponent} from './routing/home/home.component';
import {PageNotFoundComponent} from './routing/page-not-found/page-not-found.component';
import {PanelLeftComponent} from './routing/get-books/panel-left/panel-left.component';
import {AddUserComponent} from './routing/add-user/add-user.component';
import { AllUserComponent } from './routing/all-user/all-user.component';
import { ModifyUserComponent } from './routing/modify-user/modify-user.component';

@NgModule
  ({
    declarations:
      [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        GetBooksComponent,
        AddBooksComponent,
        HomeComponent,
        PageNotFoundComponent,
        PanelLeftComponent,
        AddUserComponent,
        AllUserComponent,
        ModifyUserComponent
      ],
    imports:
      [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
      ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule {}
