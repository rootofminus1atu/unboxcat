import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result, err, ok } from 'neverthrow';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatApiService {
  private urlBase = "http://localhost:3000"
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
    return this.http.get<Cat>(this.url(`/random`))
      .pipe(
        tap(data => console.log('/cats/random message/error', JSON.stringify(data))),
        map(cat => ok(cat)),
        catchError(this.handleError)
      )
  }

  private handleError (e: HttpErrorResponse): Observable<Result<never, string>> {
    console.error('/cats error:', e.message);
    return of(err(e.message))
  }
}
