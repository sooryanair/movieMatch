import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Constants } from '../utility/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  movieDBBase = Constants.MOVIE_BASE_URL;
  movieOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer  ${environment.MOVIE_API_KEY}`
    }
  };
  constructor(private apiHandler: ApiHandlerService) { }

  // getMovies(): Observable<any> {
  //   return this.apiHandler.getMovieData();
  // }

  getMovies(params: string): Observable<any> {
    let apiUrl = this.movieDBBase + params;
    return this.apiHandler.get(apiUrl, this.movieOptions);
  }
}
