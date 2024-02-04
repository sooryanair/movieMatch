import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Constants } from '../utility/constants';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})

export class MovieComponent implements OnInit {


  movieList: any;
  currentMovie: any = {};
  position: number = 0;
  likeList: any[] = [];

  constructor(private apiService: ApiService, public firestore: Firestore) { }

  ngOnInit(): void {
    // this.apiService.getMovies().subscribe((res) => {
    //   this.movieList = res.results;
    //   this.currentMovie = this.movieList[this.position];
    //   console.log(res);
    // });
    const popularMovies = Constants.MOVIE_PARAM1 + '1';
    this.apiService.getMovies(popularMovies).subscribe((res) => {
      this.movieList = res.results;
      this.currentMovie = this.movieList[this.position];
      console.log(res);
    });
  }

  // SOLUTION - go to next movie no matter which direction we swipe

  async like() {
    //check if already exists in the array before pushing it
    this.likeList.push(this.currentMovie);
    console.log(this.likeList)
    // push to firestore db
    try {
      const docRef = await addDoc(collection(this.firestore, 'watchList'), {
        title: this.currentMovie?.title,
        id: this.currentMovie?.id,
      });
      console.log("Movie added to watchList: ", docRef.id);
      this.nextMovie();
    } catch (error) {
      console.error(error);
    }
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
