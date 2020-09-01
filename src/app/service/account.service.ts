import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable
  ({
    providedIn: 'root'
  })
export class AccountService
{
  URL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  async registerUser(name: string, email: string, phone: string, address: string, state: string, city: string, dni: string): Promise<any>
  {
    let json: any =
    {
      name: name,
      email: email,
      phone: phone,
      address: address,
      state: state,
      city: city,
      dni: dni
    };

    return await this.http.post(this.URL + '/newuser', json).toPromise();
  }

  async allUser(page: number): Promise<any>
  {
    return await this.http.get<any>(this.URL + '/user/' + page).toPromise();
  }

  async login(user: string, pass: string): Promise<boolean>
  {
    let json: any =
    {
      user: user,
      password: pass
    };

    // se envian datos al servidor y se espera una respuesta.
    let result: any = await this.http.post(this.URL + '/login', json).toPromise()
      .catch(e =>
      {
        console.log(e);
      });

    if (result.response == 'ok')
    {
      // se almacena en el cache del navegador el nombre del usuario.
      // con esto ya pasara el canActivate del auth.guard
      localStorage.setItem('user', user);
      return true;
    }
    else
    {
      return false;
    }
  }
}
