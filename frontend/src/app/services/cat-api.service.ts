import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result, err, ok } from 'neverthrow';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Cat } from '../interfaces/cat';

@Injectable({
  providedIn: 'root'
})
export class CatApiService {
  private urlBase = "/backend"
  private url = (path: string) => `${this.urlBase}/cats${path}`

  constructor(private http: HttpClient) { }

  getAllCats(): Observable<Result<Cat[], string>> {
    return this.http.get<Cat[]>(this.url("/"))
      .pipe(
        tap(data => console.log('/cats/ message/error', JSON.stringify(data))),
        map(cat => ok(cat)),
        catchError(this.handleError)
      )
  }

  getCatById(id: string): Observable<Result<Cat, string>> {
    return this.http.get<Cat>(this.url(`/${id}`))
      .pipe(
        tap(data => console.log('/cats/:id message/error', JSON.stringify(data))),
        map(cat => ok(cat)),
        catchError(this.handleError)
      )
  }

  getRandomCat(): Observable<Result<Cat, string>> {
    return this.http.post<Cat>(this.url(`/random`), {})
      .pipe(
        tap(data => console.log('/cats/random message/error', JSON.stringify(data))),
        map(cat => ok(cat)),
        catchError(this.handleError)
      )
  }

  getRandomCatMock(): Observable<Result<{ url: string }, string>> {
    return this.http.get<{ url: string }[]>("https://api.thecatapi.com/v1/images/search")
      .pipe(
        delay(5000),
        tap(data => console.log('/cats/random message/error', JSON.stringify(data))),
        map(cat => ok(cat[0])),
        catchError(this.handleError)
      )
  }

  getRandomCatMockFail(): Observable<Result<Cat, string>> {
    return of(err("uh oh :(")).pipe(delay(1000))
  }

  getRandomCatMockSuccess(): Observable<Result<Cat, string>> {
    return of(ok({
      "_id": "K29_o7SGa",
      "imgUrl": "https://cdn2.thecatapi.com/images/K29_o7SGa.jpg",
      "breed": {
          "id": "soma",
          "name": "Somali",
          "temperament": [
              "Mischievous",
              "Tenacious",
              "Intelligent",
              "Affectionate",
              "Gentle",
              "Interactive",
              "Loyal"
          ],
          "alt_names": [
              "Fox Cat",
              "Long-Haired Abyssinian"
          ],
          "origin": "Somalia",
          "country_code": "SO",
          "description": "The Somali lives life to the fullest. He climbs higher, jumps farther, plays harder. Nothing escapes the notice of this highly intelligent and inquisitive cat. Somalis love the company of humans and other animals.",
          "wikipedia_url": "https://en.wikipedia.org/wiki/Somali_(cat)",
          "_id": "6643787a4f3632898728f1cc"
      },
      "rarity": "MYTHIC",
      "petName": "Rachel",
      "fullName": "Rachel, the Interactive Somali",
      "createdAt": "2024-05-14T14:43:06.906Z",
      "updatedAt": "2024-05-14T14:43:06.906Z",
      "__v": 0
    })).pipe(delay(1000))
  }

  private handleError (e: HttpErrorResponse): Observable<Result<never, string>> {
    console.error('/cats error:', e.message);
    return of(err(e.message))
  }
}
