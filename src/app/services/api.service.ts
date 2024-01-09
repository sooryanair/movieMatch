import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apiHandler: ApiHandlerService) {}

  getMovies(): Observable<any> {
    return this.apiHandler.getMovieData();
  }
}
