import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BooksService
{
  URL: string = 'https://aqueous-spire-30568.herokuapp.com';
  URL_LOCAL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getBooksBy(target: string, value: string): Promise<any[]>
  {
    try
    {
      return await this.http.get<any[]>(this.URL_LOCAL + '/getBooksBy/' + target + '/' + value).toPromise();
    }
    catch (e)
    {
      console.log(e);
      return new Array();
    }
  }
  /**
   * Se obtienen todos los libros.
   * format:
   * array -> [{"id":"", "name":"", "author":"", "lended":"", "gender":""}]
   */
  async get(): Promise<any[]>
  {
    try
    {
      return await this.http.get<any[]>(this.URL + '/libro').toPromise();
    }
    catch (e)
    {
      console.log(e);
      return new Array();
    }
  }

  /**
   * Se guarda un nuevo libro.
   * @param name 
   * @param author 
   * @param gender
   * @returns status number
   *  -> 200: ok
   *  -> 403: acceso prohibido
   */
  async add(name: string, author: string, gender: string): Promise<number>
  {
    /**
     * POST /libro
     * req.body {"name":"", "author":"", "lended":"", "gender":""}
     * res.status = 200
     * res.status = 403
     */

    let response: any = 200;

    // se crea objeto a ser enviado
    let json: any =
    {
      name: name,
      author: author,
      lended: '',
      gender: gender,
    };

    await this.http.post(this.URL + '/libro', json).toPromise()
      .catch(e =>
      {
        response = e.status;
      });
    return response;
  }

  /**
   * Se actualiza a quien se le presto el libro.
   * @param id 
   * @param lended 
   */
  lended(id: string, lended: string): void
  {
    // se crea objeto a ser enviado
    let json =
    {
      lended: lended,
    };

    try
    {
      this.http.put(this.URL + '/libro/' + id, json).subscribe();
    }
    catch (e)
    {
      console.log(e);
    }
  }
}
