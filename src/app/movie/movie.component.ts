import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieComponent implements OnInit {
  movieList: any;
  swiperEl: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.swiperEl = document.querySelector('swiper-container');
    this.apiService.getMovies().subscribe((res) => {
      this.movieList = res.results;
      console.log(res);
    });
    this.onLike();
    this.onDislike();
  }

  // SOLUTION - go to next movie no matter which direction we swipe

  onLike() {
    this.swiperEl.swiper.on('slideNextTransitionEnd', function () {});
  }

  onDislike() {
    this.swiperEl.swiper.on('slidePrevTransitionEnd', () => {
      this.dislike();
    });
  }

  like() {
    this.swiperEl.swiper.slideNext();
    // we add to likes
  }

  dislike() {
    this.swiperEl.swiper.slideNext();
    // remove from movie list
  }
}
