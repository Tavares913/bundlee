import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Individual } from '../components/individual/individual.component';
import { Util } from '../util';

@Injectable({
  providedIn: 'root',
})
export class MetacriticService {
  util = Util;
  private baseUrl = `${this.util.BASE_URL}/api/metacritic/games`;

  constructor(private http: HttpClient) {}

  searchGames(search: string, platform: string) {
    return this.http.get<MetacriticSearchGamesResponse>(
      `${this.baseUrl}?search=${search}&platform=${platform}`
    );
  }

  metacriticGamesToIndividuals(res: MetacriticSearchGamesResponse) {
    if (!res.data.games) return [];
    const formattedData: Individual[] = res.data.games.map((d) => {
      return {
        id: -1,
        platformId: '',
        platform: 'metacritic',
        title: d.title,
        type: 'game',
        year: new Date(d.releaseDate).getFullYear(),
        description: '',
        status: '',
        rating: {
          metacritic: d.criticScore / 10,
        },
        coverLink: d.productImage,
        thumbnailLink: d.productImage,
      };
    });

    return formattedData;
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
