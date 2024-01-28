import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})

export class MovieComponent implements OnInit {
  movieList: any;
  currentMovie: any;
  position: number = 0;
  likeList: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe((res) => {
      this.movieList = res.results;
      this.currentMovie = this.movieList[this.position];
      console.log(res);
    });
  }

  // SOLUTION - go to next movie no matter which direction we swipe

  like() {
    this.nextMovie();
    //check if already exists in the array before pushing it
    this.likeList.push(this.currentMovie);
    console.log(this.likeList)
    // we add to likes
  }

  dislike() {
    this.nextMovie();
    // remove from movie list
  }

  private nextMovie() {
    this.position++;
    if (this.movieList.length > this.position) {
      this.currentMovie = this.movieList[this.position];
    }
  }
}
