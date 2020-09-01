import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GenderService
{
  URL: string = 'https://aqueous-spire-30568.herokuapp.com';
  URL_LOCAL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getCount(target: string): Promise<any[]>
  {
    try
    {
      return await this.http.get<any[]>(this.URL_LOCAL + '/count/' + target).toPromise();
    }
    catch (e)
    {
      console.log(e);
      return new Array();
    }
  }



  /**
   * Se obtienen todos los generos.
   * format:
   * array -> [{"id":"", "name":""}]
   */
  async get(): Promise<any[]>
  {
    try
    {
      return await this.http.get<any[]>(this.URL + '/genero').toPromise();
    }
    catch (e)
    {
      console.log(e);
      return new Array();
    }
  }

  /**
   * Agrega un nuevo genero.
   * @param name 
   */
  async add(name: string): Promise<any>
  {
    let json =
    {
      name: name,
    }
    this.http.post<any>(this.URL + '/genero', json);
  }
}
