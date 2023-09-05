import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetacriticService {
  private baseUrl = 'http://localhost:8080/api/metacritic/games';

  constructor(private http: HttpClient) {}

  searchGames(search: string, platform: string) {
    return this.http.get<MetacriticSearchGamesResponse>(
      `${this.baseUrl}?search=${search}&platform=${platform}`
    );
  }
}

export interface MetacriticSearchGamesResponse {
  data: {
    games: {
      criticScore: number;
      developer: string;
      genres: string[];
      numOfCriticReviews: number;
      numOfMixedCriticReviews: number;
      numOfNegativeCriticReviews: number;
      numOfPositiveCriticReviews: number;
      platform: string;
      productImage: string;
      publisher: string[];
      releaseDate: string;
      title: string;
      url: string;
    }[];
  };
}
