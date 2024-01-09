import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  movieList: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMovies().subscribe((res) => {
      this.movieList = res.results;
      console.log(res);
    });
  }
}
