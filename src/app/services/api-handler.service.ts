import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from '../utility/constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  private movieApiUrl = Constants.MOVIE_BASE_URL;
  private movieHeaders = new HttpHeaders({
    'X-RapidAPI-Key': environment.MOVIE_API_KEY,
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(url, data, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  public put(url: string, data: any, options?: any): Observable<any> {
    return this.http.put(url, data, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  public getMovieData(): Observable<any> {
    const options = {
      headers: this.movieHeaders,
    };

    return this.http
      .get<any>(this.movieApiUrl, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): string {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return errorMessage;
  }
}
